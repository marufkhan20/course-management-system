import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useAddPaymentMutation } from "../features/payment/paymentApi";

const AddCardModal = ({ modal, control }) => {
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvvCode, setCvvCode] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const [error, setError] = useState({});

  const [addPayment, { data, isLoading, isError, error: responseError }] =
    useAddPaymentMutation();

  const reset = () => {
    setMethod("card");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCvvCode("");
    setPaymentName("");
    setPaypalEmail("");
    setError({});
  };

  useEffect(() => {
    if (!isLoading && isError) {
      console.log(responseError);
    }

    if (!isLoading && !isError && data?._id) {
      reset();
    }
  }, [data, isLoading, isError, responseError, control]);

  // check validation
  const checkValidation = () => {
    const validationError = {};

    if (method === "card") {
      if (!cardNumber) {
        validationError.cardNumber = "Card Number is Required!!";
      }

      if (!month) {
        validationError.month = "Month is Required!!";
      }

      if (!year) {
        validationError.year = "Year is Required!!";
      }

      if (!cvvCode) {
        validationError.cvvCode = "CVV Code is Required!!";
      }
    }

    if (method === "paypal") {
      if (!paypalEmail) {
        validationError.paypalEmail = "Email is Required!!";
      }
    }

    if (!paymentName) {
      validationError.paymentName = "Payment Name is Required!!";
    }

    return validationError;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check validation
    const validationError = checkValidation();
    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    addPayment({
      methodType: method,
      cardNumber,
      month,
      year,
      cvvCode,
      paymentName,
      paypalEmail,
    });

    control();
  };
  return (
    modal && (
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="p-4 flex items-center justify-between border-b">
                <h3 className="font-semibold text-secondary text-lg">
                  Add New Payment Method
                </h3>
                <span onClick={() => control()}>
                  <TiDeleteOutline className="text-[#EB4334] cursor-pointer text-2xl" />
                </span>
              </div>
              <div className="p-4 mt-3">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <input
                      name="payment"
                      onChange={(e) => setMethod(e.target.value)}
                      value="card"
                      type="radio"
                      id="card"
                      checked={method === "card"}
                    />
                    <label className="text-content text-xs" htmlFor="card">
                      Credit or Debit card
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      name="payment"
                      value="paypal"
                      type="radio"
                      id="paypal"
                      onChange={(e) => setMethod(e.target.value)}
                      checked={method === "paypal"}
                    />
                    <label className="text-content text-xs" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {method === "card" ? (
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-content text-sm block mb-2"
                          htmlFor="number"
                        >
                          Card Number
                        </label>
                        <input
                          className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                          type="number"
                          // required
                          id="number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>
                      {error?.cardNumber && (
                        <div className="mt-2 text-xs text-red-400">
                          <span>{error?.cardNumber}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-5 mt-5">
                        <div>
                          <label
                            className="text-content text-sm block mb-2"
                            htmlFor="month"
                          >
                            Month
                          </label>
                          <select
                            name="month"
                            id="month"
                            className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option value="">Month</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">september</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                          </select>
                          {error?.month && (
                            <div className="mt-2 text-xs text-red-400">
                              <span>{error?.month}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label
                            className="text-content text-sm font-medium block mb-2"
                            htmlFor="year"
                          >
                            Year
                          </label>
                          <select
                            name="year"
                            id="year"
                            className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Year</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                          </select>
                          {error?.year && (
                            <div className="mt-2 text-xs text-red-400">
                              <span>{error?.year}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            className="text-content text-sm font-medium block mb-2"
                            htmlFor="cvvCode"
                          >
                            CVV Code
                          </label>
                          <input
                            className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                            type="number"
                            // required
                            id="cvvCode"
                            value={cvvCode}
                            onChange={(e) => setCvvCode(e.target.value)}
                            placeholder="XXXX"
                          />
                          {error?.cvvCode && (
                            <div className="mt-2 text-xs text-red-400">
                              <span>{error?.cvvCode}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-content text-sm block mb-2"
                          htmlFor="paypalEmail"
                        >
                          Paypal Email
                        </label>
                        <input
                          className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                          type="email"
                          // required
                          id="paypalEmail"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="paypal@example.com"
                        />
                      </div>
                      {error?.paypalEmail && (
                        <div className="mt-2 text-xs text-red-400">
                          <span>{error?.paypalEmail}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-5">
                    <label
                      className="text-content text-sm block mb-2"
                      htmlFor="paymentName"
                    >
                      Name on Card
                    </label>
                    <input
                      className="block w-full border rounded-lg py-2 px-4 text-xs outline-none focus:ring-1"
                      type="text"
                      // required
                      id="paymentName"
                      value={paymentName}
                      onChange={(e) => setPaymentName(e.target.value)}
                      placeholder="Address"
                    />
                  </div>
                  {error?.paymentName && (
                    <div className="mt-2 text-xs text-red-400">
                      <span>{error?.paymentName}</span>
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-4">
                    <button
                      className="bg-[#e85665] block py-2 px-6 border-2 border-[#e85665] rounded text-sm font-medium text-white transition-all hover:bg-[#FF6B7A] hover:border-transparent"
                      type="submit"
                    >
                      Save changes
                    </button>
                    <button
                      className="bg-[#505f67] block py-2 px-6 border-2 border-[#505f67] rounded text-sm font-medium text-white transition-all hover:bg-[#5F717A] hover:border-transparent"
                      onClick={() => control()}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddCardModal;
