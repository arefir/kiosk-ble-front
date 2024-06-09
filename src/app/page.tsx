'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useStores } from '../context/StoreContext';
import { getOrder } from './dbController';
import axios, { Axios } from 'axios';
// import CartPage from './cart/page';
// import Link from 'next/link';

const KioskPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // 기본 첫 번째 카테고리로 설정
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [recommendedItems, setRecommendedItems] = useState<any[]>([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { stores } = useStores();
  const [selectedStoreId, setSelectedStoreId] = useState(0)
  const [store, setStore] = useState(stores.find(store => store.id == selectedStoreId))



  useEffect(() => {
    // 여기에 추천 메뉴 3개 넣어주세요
    // 예를 들어, 추천 메뉴를 DB에서 받아오는 코드:

    const getUser = async () => {
      const currentUser: any = await axios.get("https://kiosk-ble.onrender.com:5555/getUser")
      console.log(currentUser)
      if (typeof currentUser === 'object' && !Array.isArray(currentUser) && currentUser !== null) {
        console.log("success")
        console.log(currentUser.data.user)
        setUser(currentUser.data.user)
        setSelectedStoreId(currentUser.data.restaurant)
      }
      setStore(stores.find(store => store.id == selectedStoreId))
      console.log(selectedStoreId)
      // console.log(`store: ${store!.id}`)

      const fetchRecommendedItems = async () => {
        const items = await getOrder()
        const filtered = await items.filter((item: { restaurantid: number; }) => item.restaurantid == selectedStoreId)
        if (filtered.length > 0)
          setRecommendedItems(filtered)

      }

      fetchRecommendedItems()

      // if (user != null && user != "null") {
      //   fetchRecommendedItems().then((items: SetStateAction<any[]>) => );
      // }

    }

    getUser()
    console.log(user)

    if (store && store.categories.length > 0) {
      const firstCategoryItems = [...store.categories[0].items];
      const randomItems = [];
      while (randomItems.length < 3 && firstCategoryItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * firstCategoryItems.length);
        randomItems.push(firstCategoryItems.splice(randomIndex, 1)[0]);
      }
      setRecommendedItems(randomItems);
    }
  }, [store, user, selectedStoreId]);

  const categories = store ? [{ id: 0, name: '추천 메뉴', items: recommendedItems }, ...store.categories] : [];
  const selectedItems = categories.find(category => category.id === selectedCategory)?.items || [];

  useEffect(() => {
    if (store?.isServingStore) {
      const storedTableNumber = localStorage.getItem('tableNumber');
      if (!storedTableNumber) {
        setIsModalOpen(true);
      } else {
        setTableNumber(storedTableNumber);
      }
    }

  }, [store]);

  const handleCategoryClick = (id: number) => setSelectedCategory(id);

  const handleTableNumberSubmit = () => {
    if (tableNumber && parseInt(tableNumber, 10) >= 1 && parseInt(tableNumber, 10) <= 30) {
      localStorage.setItem('tableNumber', tableNumber);
      setIsModalOpen(false);
    } else {
      alert('테이블 번호는 1에서 30 사이의 값이어야 합니다.');
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (!scrollRef.current) return;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (!store) {
    return <div>Store not found</div>;
  }

  const totalOrderPrice = store.categories.reduce((acc, category) => {
    const categoryTotal = category.items.reduce((categoryAcc, item) => {
      const itemTotal = item.price * (item.quantity || 0);
      const setItemTotal = item.setPrice ? item.setPrice * (item.setQuantity || 0) : 0;
      return categoryAcc + itemTotal + setItemTotal;
    }, 0);
    return acc + categoryTotal;
  }, 0);

  return (
    <div className="font-sans text-center bg-white min-h-screen relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">알림</h2>
            <p className="mb-4">서빙 서비스를 제공하는 매장입니다.<br />테이블에 적혀있는 테이블 번호를 입력해주세요.</p>
            <input
              type="number"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4"
              placeholder="테이블 번호 입력"
              min={1}
              max={30}
            />
            <button
              onClick={handleTableNumberSubmit}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
            >
              확인
            </button>
          </div>
        </div>
      )}
      <header className="relative w-full h-56">
        <Image src={store.imageUrl || '/default.jpg'} alt="Restaurant" layout="fill" objectFit="cover" className="w-full h-full object-cover" />
      </header>
      <h1 className="text-3xl font-bold my-4">{store.name}</h1>
      <nav
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeaveOrUp}
        onMouseUp={onMouseLeaveOrUp}
        onMouseMove={onMouseMove}
        className="relative flex justify-start overflow-x-auto whitespace-nowrap mt-0 px-4 cursor-grab active:cursor-grabbing h-32 items-center custom-scroll"
      >
        {categories.map(category => (
          <button
            key={category.id}
            className={`flex-shrink-0 px-6 py-3 mx-2 text-xl rounded-full ${category.id === selectedCategory ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </nav>
      <main className="p-4 bg-white mt-0">
        {selectedItems.map(item => (
          <div key={item.id} className="flex items-center cursor-pointer border-b py-4" onClick={() => router.push(`/menu/${store!.id}/${selectedCategory === 0 ? store!.categories[0].id : selectedCategory}/${item.id}`)}>
            <div className="flex-shrink-0 mr-4" style={{ width: '210px', height: '150px' }}>
              <Image src={item.imageUrl} alt={item.name} width={210} height={150} className="object-contain w-full h-full" />
            </div>
            <div className="text-left flex-1">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="text-lg text-gray-500 mt-2">
                {item.setPrice ? `단품 ${item.price.toLocaleString()}원 세트 ${item.setPrice.toLocaleString()}원` : `${item.price.toLocaleString()}원`}
              </p>
            </div>
          </div>
        ))}
      </main>
      {totalOrderPrice > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
          <button className="bg-orange-500 text-white w-full py-2 rounded-lg"
            onClick={() => { router.push("/cart") }}>
            총 {totalOrderPrice.toLocaleString()}원 주문하기
          </button>
        </div>
      )}
    </div>
  );
};

export default KioskPage;
