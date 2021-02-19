# PADL: Port Examples

The post will walk through the core loop of [PADL](./2020-11-20-1-PADL-Architecture.md) in a worked example.

// https://pragprog.com/titles/swdddf/domain-modeling-made-functional/

## The Problem: E-Commerce Checkout

Let's use a well known problem domain: e-commerce.

The first step is to decide what part of an e-commerce system we're working on. We'll approach it from a workflow perspective, like in [event storming](https://www.eventstorming.com/).
*Checkout* seems like a clear enough workflow that can also be complex.


## Feeling out the workflow

This would be an ideal time to talk with domain experts and customers. It is their problem that we're trying to solve after all. [DDD](https://www.dddcommunity.org/books/) is a mature paradigm for mapping business ideas into software.

We, however, don't have a customer. So we'll have to do some guess work.

We know checkout will at least need a list of products
```cs
class CheckoutCommand{
    ProductIds[] ProductIds;
}
```
We'll also need quantities and payment info. We'll leave out shipping and users for simplicity. Assume products are only digital downloads.

```cs
class CartItem{
    ProductId[] ProductId;
    Quantity Quantity
}

class PaymentInfo{
    // decide valid payment methods later
}
class CheckoutCommand{
    CartItem[] PurchasedGoods;
    PaymentInfo PaymentInfo;
}
```

This command needs to be handled by some action
```cs
interface CheckoutManager{
    void Checkout(CheckoutCommand command)
}
```

Right now we're only looking at checkout. I can image other top level actions here like `EstimateCartTotal`. Not our concern right now though. 

Hmm, void isn't a very descriptive. I'd guess our customer will want some feedback on their checkout. What could happen?
- the payment could fail
- a product could be out of stock?
  - no, these are digital-only goods for now
- Purchase succeeds
  - They'll need to access their goods somehow
  - Will want some order reference in case of issues or claims

```cs
class CheckoutResult : Result<CheckoutSuccess ,CheckoutError>{}

class CheckoutSuccess{
    OrderId OrderId;
    DateTime OrderPlacedAt;
}

class CheckoutFailure{
    class PaymentFailure : CheckoutFailure {
        //...
    }
}
```

This gives us a pretty good sketch of a checkout
```cs
interface CheckoutManager{
    CheckoutResult Checkout(CheckoutCommand command)
}
```

## Feeling out the ports

We've got a good idea what our top level operation will look like. Now we need to start breaking it down.

I can tell without even trying to code that we'll need a way to process payments and calculate cart totals. Both could have many implementations without changing the flow for checkout.

```cs
interface ICheckoutPaymentProvider{
    void Pay(PaymentMethod method, double price);
}

interface ICartCalculator{
    double CalculateTotalPrice(CartItem[] purchasedItems);
}
```


Again, payments could fail an needs to indicate such. We'll just return on optional failure since no info is needed on success.

```cs
interface ICheckoutPaymentProvider{
    PaymentFailure? Pay(PaymentMethod method, double price);
}
```

At this point let's attempt an implementation

```cs
class CheckoutManager : ICheckoutManager{
    ICartCalculator cartCalculator;
    ICheckoutPaymentProvider paymentProvider;
    public CheckoutManager(ICartCalculator cartCalculator, ICheckoutPaymentProvider paymentProvider){
        //...
    }

    public CheckoutResult Checkout(CheckoutCommand command){
        var cartTotal = cartCalculator.CalculateTotalPrice(command.PurchasedGoods);

        var paymentError = paymentProvider.Pay(command.PaymentInfo, cartTotal);

        if(paymentError != null){
            return paymentError;
        }
        else {
            return new CheckoutSuccess{
                // TODO: We don't have an order Id!!
            }
        }
    }
}
```

Oops, looks like we need a way to create orders from the checkout info. I think you can imagine how to add a port for that.

## Reflection so far
That flow implementation was able to go pretty far without any concrete dependencies. So far we haven't give a thought to what payment service we'll need, where data is stored, or how we'll host the service.

Instead we've pushed off all the details that could change by creating an abstraction. This let us keep a tight work loop for defining the flow only by its own expected behavior. The code is very readable and flexible. We were even able to find a gap in our implementation.

Filling out the order reference would leave us will an implementation that meets our need and a list of ports that take little imagination to implement.


## Flexibility under change

This example was quite stripped down. Lot's of techniques can work on simple problems with one pass. Let's look at how the design responds to change.

### Payment methods
The fastest payment method would be to use some external payment service, like Stripe. 

```cs
class Stripe : PaymentInfo{
    string ClaimToken;
}
```
Does the Checkout Manager change? No. We can implement the payment provider as a wrapper of the stripe api, and our checkout manager is none the wiser. Swapping in other payment services would be just as simple.

What if we want to save on transaction fees and eat the PCI compliance hurdle?

```cs
class CreditCard : PaymentInfo{
    string CardNumber;
    string SercurityCode;
    string NameOnCard;
}
class Check : PaymentInfo{
    string AccountNumber;
    string RoutingNumber;
}
```
We will likely want to implement payments as a stand alone service. Probably even a sub-domain.

Again, the checkout manager is unaffected. That service still integrates just like the external ones did, through the `ICheckoutPaymentProvider`. We've limited the checkout flow's view of payment to only what it wanted to know, shielding it to these external changes.


### Coupons

Coupons would require updating our input with a new flow abstraction
```cs
class CouponCode{
    string Code;
}
class CheckoutCommand{
    CartItem[] PurchasedGoods;
    PaymentInfo PaymentInfo;
    CouponCodes[] Coupons;
}
```

This information also needs to be accounted for when calculating totals. 
```cs
interface ICartCalculator{
    double CalculateTotalPrice(CartItem[] purchasedItems, CouponCodes[] coupons);
}
```
This raises in intersting question. Can a coupon fail and does a customer need to know about it? That sounds like a business question. It depends what kind of promotions you want to run. If it can fail, make it clear in the port interface.

That is as far as the changes go though. Our flow did change, but most complexity of the new feature is hidden. The flow neither knows nor cares if coupons only apply to certain products, if they require certain totals to trigger, if coupons their managed by some sass platform or kept in a configuration file. 

Self-managed coupons are a good example of an adapter that could evolve into an engine. It could even be a sub-domain with it's own team if the complexity favors it.

### Send a Confirmation Email
Customers will generally want a email confirmation of their purchase.

This is a prime candidate for an event port. The overhead of a more generalized port is so low I generally allow multiple events via a single port as long as they use  
```cs
enum OrderEventType{
    OrderPlaced
}
interface IOrderEventNotifier{
    void Notify(OrderEventType event, OrderId id); 
}
```

```cs
//...
public CheckoutResult Checkout(CheckoutCommand command){
        var cartTotal = cartCalculator.CalculateTotalPrice(command.PurchasedGoods);

        var paymentError = paymentProvider.Pay(command.PaymentInfo, cartTotal);
        var orderId = ;// create order here 

        if(paymentError != null){
            return paymentError;
        }
        else {
            orderEventNotifier.Notify(OrderEventType.OrderPlaced, orderId)
            return new CheckoutSuccess{
                // TODO: We don't have an order Id!!
            }
        }
    }
//...
```

Calling this event on successful payment let's us configure any number of handlers. We can certainly send an order confirmation. We could also start a drip marketing campaign, queue data for reporting, send notifications based on configured user preferences, and much more. The flow doesn't and shouldn't care which of these options are implemented.

Notifications are a good example of an adapter that could evolve into a utility.

## Summary
This example previewed different kinds of ports and how ports simplify incremental design by pushing volatile details into abstractions. The design of ports is heavily tied to the domain design. Choosing good ports is a matter of practice, but is much easier than balancing domain and implementation concerns at once. 

More examples
- [Notification case study](../../_posts/2020-08-14-Notification-Design.md)
- [Background task case study](../../_posts/2020-09-11-Background-Task-Refactor.md)
- A book-long example [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)