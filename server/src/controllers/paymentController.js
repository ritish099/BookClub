import config from "../../config/config.js";
import stripe from "stripe";
const stripeElement = stripe("sk_test_tR3PYbcVNZZ796tH88S4VQ2u");

const acceptPayment = async (req, res, next) => {
  try {
    const total = req.body.total * 100;

    const session = await stripeElement.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Amount",
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.FRONTEND_URL}?payment=payment-success`,
      cancel_url: `${config.FRONTEND_URL}?payment=payment-failure`,
    });

    res.status(200).json({
      url: session.url,
    });

  } catch (err) {
    next();
  }
};

export {acceptPayment};
