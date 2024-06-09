"use client";

import React, { useEffect, useState } from 'react';
import { FaHourglassHalf, FaReceipt, FaCheck, FaStar, FaArrowLeft, FaEdit } from 'react-icons/fa';
import axios, { AxiosResponse } from "axios";
import { fromJSON } from 'postcss';
import { getCart, saveOrder, emptyCart, getOrder } from "../dbController"

const CartPage = () => {

  // const getCart = async () => {
  //   const cart = await axios.get("http://localhost:5555/getCart")
  //   return cart
  // }


  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Empty Cart',
      price: 0,
      quantity: 0,
      imgUrl: "",
    }
  ]);

  useEffect(() => {
    const updateData = async () => {
      const currentCart = await getCart()
      setCart(currentCart || 0);
      console.log(currentCart)
    }
    updateData()
  }, [cart]);


  const [tableNumber, setTableNumber] = useState('01');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [view, setView] = useState<'cart' | 'payment' | 'info'>('cart');
  const [orderStatus, setOrderStatus] = useState<'received' | 'cooking' | 'completed'>('received');
  const [isEditingTableNumber, setIsEditingTableNumber] = useState(false);

  const handleQuantityChange = (id: number, amount: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
    ));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleTableNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableNumber(event.target.value);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const proceedToPayment = () => {
    setView('payment');
  };

  const proceedToOrderInfo = async () => {
    const resId = await axios.get("https://kiosk-ble.onrender.com:5555/getUser")
    if (resId.data.user != null && resId.data.user != "null")
      cart.forEach(async item => {
        const order = await getOrder()
        const dupe = order.find((i: { id: number; }) => i.id == item.id)
        if (!dupe)
          saveOrder({ ...item, restaurantid: resId.data.restaurant })
      })
    emptyCart()
    setView('info');
    setOrderStatus('received');
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const advanceOrderStatus = () => {
    if (orderStatus === 'received') {
      setOrderStatus('cooking');
    } else if (orderStatus === 'cooking') {
      setOrderStatus('completed');
    }
  };

  const goBack = () => {
    if (view === 'info') {
      setView('payment');
    } else if (view === 'payment') {
      setView('cart');
    }
  };

  const handleEditTableNumber = () => {
    setIsEditingTableNumber(true);
  };

  const handleSaveTableNumber = () => {
    setIsEditingTableNumber(false);
  };

  function setPrice(arg0: number) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md max-w-screen-md sm:max-w-screen-lg">
      {view === 'cart' && (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center">장바구니</h1>
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0">
                <img src={item.imgUrl} alt={item.name} className="w-16 h-16 rounded" />
                <div className="flex-1 ml-4">
                  <div className="text-gray-700 text-base">{item.name}</div>
                  <div className="text-gray-500 text-sm">{item.price}원</div>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="border px-2 py-1 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="border px-2 py-1 rounded">+</button>
                </div>
              </div>
            ))}
            <div className="text-right mb-4">
              <button className="text-sm text-gray-500">전체삭제</button>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-gray-700 text-lg font-semibold">총 결제금액</div>
              <div className="text-gray-900 text-2xl font-bold">{totalAmount.toLocaleString()}원</div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-4 text-center relative">
            <label htmlFor="tableNumber" className="text-gray-500 text-sm mb-2 block" title="Table Number">테이블 번호</label>
            {isEditingTableNumber ? (
              <div className="flex items-center justify-center">
                <select
                  id="tableNumber"
                  value={tableNumber}
                  onChange={handleTableNumberChange}
                  className="text-3xl font-bold text-gray-700 bg-white border border-gray-300 rounded-md p-2"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(number => (
                    <option key={number} value={number.toString()}>
                      {number}번
                    </option>
                  ))}
                  <option value="포장">포장</option>
                </select>
                <button
                  className="ml-2 bg-blue-500 text-white rounded p-2"
                  onClick={handleSaveTableNumber}
                  title="Save Table Number"
                >
                  저장
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-700">{tableNumber}</span>
                <button
                  className="ml-2"
                  onClick={handleEditTableNumber}
                  title="Edit Table Number"
                >
                  <FaEdit size={24} />
                </button>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mt-4">
            <div className="text-gray-700 text-lg font-semibold mb-2">결제수단</div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
                title="Cash Payment"
              />
              <label htmlFor="cash" className="text-gray-700">현금</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
                title="Card Payment"
              />
              <label htmlFor="card" className="text-gray-700">카드</label>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={proceedToPayment}
              className="bg-blue-500 text-white rounded p-2"
              title="Proceed to Payment"
            >
              결제하기
            </button>
          </div>
        </>
      )}

      {view === 'payment' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button className="mr-2" title="Back" onClick={goBack}>
              <FaArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-semibold flex-grow text-center">결제</h1>
            <div className="w-8"></div> {/* Placeholder to balance the layout */}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-4 text-center">
            <h2 className="text-lg font-semibold mb-4">결제 방법</h2>
            {paymentMethod === 'cash' ? (
              <div>
                <p>현금 결제를 선택하셨습니다.</p>
                <p>결제를 완료하려면 현금을 준비해 주세요.</p>
                <button
                  onClick={proceedToOrderInfo}
                  className="bg-blue-500 text-white rounded p-2 mt-4"
                  title="Confirm Payment"
                >
                  결제 확인
                </button>
              </div>
            ) : (
              <div>
                <div id="payment-widget" />
                <div className="mt-4">
                  <input
                    type="checkbox"
                    id="coupon"
                    title="Apply Coupon"
                    onChange={(event) => {
                      setPrice(event.target.checked ? 45000 : 50000);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="coupon">5,000원 할인 쿠폰 적용</label>
                </div>
                <button
                  onClick={() => {
                    // Payment logic goes here
                    proceedToOrderInfo();
                  }}
                  className="bg-blue-500 text-white rounded p-2 mt-4"
                  title="Make Payment"
                >
                  결제하기
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {view === 'info' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button className="mr-2" title="Back" onClick={goBack}>
              <FaArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-semibold flex-grow text-center">주문 정보</h1>
            <div className="w-8"></div> {/* Placeholder to balance the layout */}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <div className="text-gray-500 text-sm mb-2">주문번호 20240524</div>
            <div className="text-gray-700 text-base mb-4">
              주문하신 불불불싸이버거 세트 2개 외 1개의 주문이 접수되었습니다.
            </div>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0">
                <img src={item.imgUrl} alt={item.name} className="w-16 h-16 rounded" />
                <div className="flex-1 ml-4">
                  <div className="text-gray-700 text-base">{item.name}</div>
                  <div className="text-gray-500 text-sm">{item.price}원</div>
                </div>
                <div className="text-gray-700 text-base">{item.quantity}개</div>
              </div>
            ))}
            <div className="flex justify-between mb-2">
              <div className="text-gray-700 text-lg font-semibold">총 결제금액</div>
              <div className="text-gray-900 text-2xl font-bold">{totalAmount.toLocaleString()}원</div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="text-gray-700 text-lg font-semibold">테이블 번호</div>
              <div className="text-gray-900 text-2xl font-bold">{tableNumber}</div>
            </div>
            <div className="flex justify-between">
              <button
                className={`flex items-center justify-center w-24 h-10 rounded ${orderStatus === 'received' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
                  }`}
                title="Order Received"
                onClick={advanceOrderStatus}
                disabled={orderStatus !== 'received'}
              >
                <FaReceipt className="mr-2" /> 주문 접수
              </button>
              <button
                className={`flex items-center justify-center w-24 h-10 rounded ${orderStatus === 'cooking' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
                  }`}
                title="Cooking"
                onClick={advanceOrderStatus}
                disabled={orderStatus !== 'cooking'}
              >
                <FaHourglassHalf className="mr-2" /> 조리 중
              </button>
              <button
                className={`flex items-center justify-center w-24 h-10 rounded ${orderStatus === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                  }`}
                title="Cooking Completed"
                onClick={openReviewModal}
                disabled={orderStatus !== 'completed'}
              >
                <FaCheck className="mr-2" /> 조리 완료
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mt-4">
            <div className="text-gray-700 text-lg font-semibold mb-2">결제 영수증</div>
            {paymentMethod === 'cash' ? (
              <div>현금 결제로 결제하였습니다.</div>
            ) : (
              <div>카드 결제로 결제하였습니다.</div>
            )}
          </div>

          {orderStatus === 'completed' && (
            <div className="border border-gray-300 rounded-lg p-4 mt-4">
              <div className="text-gray-700 text-lg font-semibold mb-2">리뷰를 작성해주세요.</div>
              <textarea
                title="리뷰를 작성해주세요."
                placeholder="리뷰를 작성해주세요."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
                  <FaStar
                    key={star}
                    size={24}
                    className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                    onClick={() => handleRating(star)}
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  // Handle review submission logic
                  closeReviewModal();
                }}
                className="bg-yellow-500 text-white rounded p-2 mt-4"
                title="Submit Review"
              >
                리뷰 제출
              </button>
            </div>
          )}
        </>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-lg w-full">
            <div className="flex items-center mb-4">
              <button onClick={closeReviewModal} className="mr-2" title="Close">
                <FaArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold">리뷰를 작성해주세요.</h2>
            </div>
            <p className="mb-4">맘스터치 에서의 식사는 만족스러우셨나요? 별점과 함께 리뷰를 남겨주세요~</p>
            <textarea
              title="리뷰를 작성해주세요."
              placeholder="리뷰를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
                <FaStar
                  key={star}
                  size={24}
                  className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                  onClick={() => handleRating(star)}
                  title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                />
              ))}
            </div>
            <button
              onClick={closeReviewModal}
              className="bg-yellow-500 text-white rounded p-2 mt-4"
              title="Submit Review"
            >
              리뷰 제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
