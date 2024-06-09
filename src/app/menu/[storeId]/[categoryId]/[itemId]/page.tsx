'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useStores } from '../../../../../context/StoreContext';
import { useEffect, useState } from 'react';
import { addToCart } from '../../../../dbController'
import axios from 'axios';

const server = process.env.SERVER_DOMAIN;

const ItemPage = ({ params }: { params: { storeId: string; categoryId: string; itemId: string } }) => {
  const router = useRouter();
  const { stores, updateStores } = useStores();
  const { storeId, categoryId, itemId } = params;

  const store = stores.find(store => store.id === parseInt(storeId, 10));
  const category = store?.categories.find(category => category.id === parseInt(categoryId, 10));
  const item = category?.items.find(item => item.id === parseInt(itemId, 10));

  const [singleQuantity, setSingleQuantity] = useState(item?.quantity || 0);
  const [setMenuQuantity, setSetMenuQuantity] = useState(item?.setQuantity || 0);

  useEffect(() => {
    setSingleQuantity(item?.quantity || 0);
    setSetMenuQuantity(item?.setQuantity || 0);
  }, [item]);

  if (!item) {
    return <div>Item not found</div>;
  }

  // const saveOrder = async () => {
  //   const res = await axios.post(`http://localhost:5555/addCart`, {
  //     item: {
  //       description: item.description,
  //       id: item.id,
  //       imageUrl: item.imageUrl,
  //       name: item.name,
  //       price: item.price,
  //       setPrice: item.setPrice,
  //       quantity: item.setQuantity,
  //       setQuantity: item.setQuantity,
  //       storeId: storeId
  //     }
  //   }, { headers: { 'Content-Type': 'application/json' } })

  //   console.log(res)
  // }

  const saveOrder = (order: any) => {
    addToCart(order)
  }

  const handleAddToCart = () => {
    console.log(item)
    const updatedStores = stores.map(s => {
      if (s.id === parseInt(storeId, 10)) {
        return {
          ...s,
          categories: s.categories.map(c => {
            if (c.id === parseInt(categoryId, 10)) {
              return {
                ...c,
                items: c.items.map(i => {
                  if (i.id === parseInt(itemId, 10)) {
                    return { ...i, quantity: singleQuantity, setQuantity: setMenuQuantity };
                  }
                  return i;
                })
              };
            }
            return c;
          })
        };
      }
      return s;
    });
    updateStores(updatedStores);
    saveOrder({ ...item, quantity: singleQuantity, setQuantity: setMenuQuantity })
    router.push(`/`); // 루트 페이지로 이동
  };

  const incrementSingleQuantity = () => setSingleQuantity(prev => prev + 1);
  const decrementSingleQuantity = () => setSingleQuantity(prev => (prev > 0 ? prev - 1 : 0));
  const incrementSetMenuQuantity = () => setSetMenuQuantity(prev => prev + 1);
  const decrementSetMenuQuantity = () => setSetMenuQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="mr-4 text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold text-gray-700 mx-auto">메뉴 정보</h1>
      </div>
      <hr className="my-4" />
      <div className="text-center">
        <Image src={item.imageUrl} alt={item.name} width={300} height={200} className="mx-auto" />
        <h1 className="text-3xl font-bold my-4">{item.name}</h1>
        <hr className="my-4" />
        <p className="text-lg my-4">{item.description}</p>
        <div className="my-4">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
            <div className="text-xl">단품 {item.price.toLocaleString()}원</div>
            <div className="flex items-center">
              <button onClick={decrementSingleQuantity} className="px-4 py-2 bg-gray-300 rounded-l text-2xl">-</button>
              <div className="px-4 py-2 border-t border-b text-2xl">{singleQuantity}</div>
              <button onClick={incrementSingleQuantity} className="px-4 py-2 bg-gray-300 rounded-r text-2xl">+</button>
            </div>
          </div>
          {item.setPrice && (
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="text-xl">세트 {item.setPrice.toLocaleString()}원</div>
              <div className="flex items-center">
                <button onClick={decrementSetMenuQuantity} className="px-4 py-2 bg-gray-300 rounded-l text-2xl">-</button>
                <div className="px-4 py-2 border-t border-b text-2xl">{setMenuQuantity}</div>
                <button onClick={incrementSetMenuQuantity} className="px-4 py-2 bg-gray-300 rounded-r text-2xl">+</button>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleAddToCart} className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-4 w-full">
          총 {(item.price * singleQuantity + (item.setPrice || 0) * setMenuQuantity).toLocaleString()}원 담기
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
