import axios from "axios";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

async function displayRazorpay(registerData, onSuccess, onFailure) {
    try {
        
        const { data } = await axios.post(`/payment/orders?id=${registerData.bootcampId}`);

        if (!data || !data.id) {
            onFailure("Failed to create order. Please try again later.");
            return;
        }

        const { amount, id: order_id, currency } = data;

       
        if (amount === 0) {
            try {
                
                const result = await axios.post(`/payment/freeRegistration`, {
                    ...registerData,
                   payment_id:null
                });
                onSuccess(result);
                return;
            } catch (error) {
                console.error("Error registering user:", error);
                onFailure(error.response.data.error);
                return;
            }
        }

        
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            onFailure("Razorpay SDK failed to load. Please check your internet connection and try again.");
            return;
        }

        const options = {
            key: 'rzp_test_Ljo5RTY9V75z4u', 
            amount: amount.toString(),
            currency: currency,
            name: "Your Company Name", 
            description: "Bootcamp Registration",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    ...registerData,
                };

                try {
                    const result = await axios.post(`/payment/success`, data);
                    onSuccess(result);
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    onFailure(error.response.data.error);
                }
            },
            prefill: {
                name: registerData.name || "", 
                email: registerData.email || "", 
                contact: registerData.phone || "", 
            },
            notes: {
                address: "Your Company Address", 
            },
            theme: {
                color: "#61dafb",
            },
            modal: {
                ondismiss: function() {
                    onFailure("Payment process was cancelled by the user.");
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("Error during payment process:", error);
        onFailure("An error occurred during the payment process. Please check your internet connection and try again.");
    }
}

const Payment = (data, onSuccess, onFailure) => {
    displayRazorpay(data, onSuccess, onFailure);
};

export default Payment;
