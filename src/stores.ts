// stores.ts
export type Store = {
    id: number;
    name: string;
    isServingStore: boolean;
    imageUrl: string;
    categories: Category[];
  };
  
  export type Category = {
    id: number;
    name: string;
    items: Item[];
  };
  
  export type Item = {
    id: number;
    name: string;
    description: string;
    price: number;
    setPrice?: number;
    quantity: number;
    setQuantity?: number;
    imageUrl: string;
  };
  
  export const stores: Store[] = [
    {
      id: 1,
      name: '맘스터치 건대로데오점',
      isServingStore: true,
      imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/restaurant.jpg',
      categories: [
        {
          id: 1,
          name: '버거',
          items: [
            { id: 1, name: '슈퍼싸이콤보', description: '빅싸이패티와 풍미가득 갈릭소스의 조화로 새롭게 태어난 맘스터치 20주년 스페셜 에디션!', price: 9800, quantity: 0, setQuantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/버거/슈퍼싸이콤보.png' },
            { id: 2, name: '불불불불싸이버거', description: '불싸이버거 소스보다 4배 매운 소스로 압도하는 매운 맛', price: 6500, setPrice: 8800, quantity: 0, setQuantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/버거/불불불불싸이버거.png' },
            { id: 3, name: '골든맥앤치즈비프버거', description: '풍미 가득 순쇠고기 패티와 진한 골든맥앤치즈 매콤한 치폴레소스까지', price: 6700, setPrice: 8700, quantity: 0, setQuantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/버거/골든맥앤치즈비프버거.png' },
            { id: 4, name: '아라비아따치즈버거', description: '고소한 통모짜렐라 치즈패티 & 부드러운 통닭다리살 & 매콤한 아라비아따소스', price: 7100, setPrice: 9400, quantity: 0, setQuantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/버거/아라비아따치즈버거.png' },
            { id: 5, name: '칠리새우버거', description: '풍미 가득 칠리토마토소스 & 새우살이 쏙쏙 새우패티의 환성적인 만남!', price: 3800, setPrice: 6100, quantity: 0, setQuantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/버거/칠리새우버거.png' },
          ]
        },
        {
          id: 2,
          name: '치킨',
          items: [
            { id: 1, name: '싸이순살맥스(후라이드)', description: '바삭한 싸이순살을 사이즈 업! 케이준양념감자와 함께 더 푸짐하게!', price: 18900, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/치킨/싸이순살맥스(후라이드).png' },
            { id: 2, name: '꿀간장누룽지싸이순살', description: '단짠바삭의 순살치킨의 정석! 꿀간장 소스와 크런치한 누룽지가 만나 단짠과 바삭함을 함께 즐기는 순살치킨!', price: 13500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/치킨/꿀간장누룽지싸이순살.png' },
            { id: 3, name: '핫치즈싸이순살', description: '딥치즈소스 매운소스가 만나 화끈하지만 부드러운 맵느의 정석 싸이순살', price: 14500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/치킨/핫치즈싸이순살.png' },
            { id: 4, name: '후라이드싸이순살', description: '케이준 양념레시피로 더 바삭하고 스파이시한 닭다리살 순살치킨', price: 11900, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/치킨/후라이드싸이순살.png' },
            { id: 5, name: '치즈뿌치(체다)', description: '색다른 체다치즈 시즈닝의 치킨! 체다치즈 고소함과 짭잘한 시즈닝이 중독적인 치킨', price: 10400, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/치킨/치즈뿌치(체다).png' },
          ]
        },
        {
          id: 3,
          name: '맘스세트',
          items: [
            { id: 1, name: '맘스패밀리세트(3인세트)', description: '후라이드싸이순살1 싸이버거3 케이준양념감자1 콜라3으로 구성된 풍성한 맘스패밀리세트', price: 28300, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/맘스세트/맘스패밀리세트(3인세트).png' },
            { id: 2, name: '맘스패밀리세트(4인세트)', description: '후라이드싸이순살1 싸이버거4 케이준양념감자2 콜라4로 구성된 풍성한 맘스패밀리세트', price: 34200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/맘스세트/맘스패밀리세트(4인세트).png' },
            { id: 3, name: '싱글비프스테이크순살세트', description: '후라이드싸이순살1 비프스테이크버거1 콜라1로 구성된 풍성한 비프스테이크 맘스세트', price: 16600, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/맘스세트/싱글비프스테이크순살세트.png' },
            { id: 4, name: '싱글통다리세트', description: '후라이드통다리1 싸이버거1 콜라1로 구성된 풍성한 맘스세트', price: 10600, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/맘스세트/싱글통다리세트.png' },
            { id: 5, name: '커플떡강정세트', description: '케이준떡강정(S)2 싸이버거2 케이준감자(S) 콜라2로 구성된 풍성한 맘스세트', price: 19700, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/맘스세트/커플떡강정세트.png' },
          ]
        },
        {
          id: 4,
          name: '사이드',
          items: [
            { id: 1, name: '코울슬로', description: '입맛을 돋우는 양배추의 아삭한 식감과 상큼한 맛의 코울슬로', price: 1800, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/사이드/코울슬로.png' },
            { id: 2, name: '콘샐러드', description: '달콤한 스위트콘에 신선한 야채가 어우러진 콘샐러드! 치킨 버거와 곁들여 먹기 좋습니다.', price: 1800, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/사이드/콘샐러드.png' },
            { id: 3, name: '케이준양념감자', description: '케이준스타일의 바삭한 양념감자 맘스터치의 베스트 사이드 메뉴!', price: 2000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/사이드/케이준양념감자.png' },
            { id: 4, name: '치즈감자', description: '케이준 양념감자와 깊고 진한 딥치즈 소스를 함께 즐길 수 있는 치즈감자', price: 2800, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/사이드/치즈감자.png' },
            { id: 5, name: '치킨무', description: '-', price: 500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/맘스터치 건대로데오점/사이드/치킨무.png' },
          ]
        },
      ]
    },
    {
      id: 2,
      name: '이삭토스트 건대로데오점',
      isServingStore: false,
      imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/restaurant.jpg',
      categories: [
        {
          id: 1,
          name: '토스트',
          items: [
            { id: 1, name: '프렌치 스크램블', description: '달콤하고 촉촉한 프렌치 토스트와 스크램블 에그의 부드러움을 담았어요', price: 3900, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/토스트/프렌치 스크램블.png' },
            { id: 2, name: '프렌치 햄치즈', description: '달콤하고 촉촉한 프렌치 토스트와 이삭토스트 시그니처 햄치즈가 만났어요', price: 3500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/토스트/프렌치 햄치즈.png' },
            { id: 3, name: '스크램블 햄치즈', description: '부드러운 스크램블과 이삭토스트의 시그니처 햄치즈가 만났어요', price: 3600, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/토스트/스크램블 햄치즈.png' },
            { id: 4, name: '불고기 스페셜', description: '오리지널 불고기의 감칠맛을 가득 담았어요', price: 4900, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/토스트/불고기 스페셜.png' },
            { id: 5, name: '딥치즈 베이컨', description: '베이컨과 딥치즈 소스 모짜렐라 치즈로 진한 고소함을 만나보세요', price: 4200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/토스트/딥치즈 베이컨.png' },
          ]
        },
        {
          id: 2,
          name: '음료',
          items: [
            { id: 1, name: '아메리카노', description: '직접 로스팅한 아라비카 원두의 깊은 풍미를 담았어요', price: 2700, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/음료/아메리카노.png' },
            { id: 2, name: '카페 라떼', description: '향긋한 커피와 부드러운 우유가 만났어요', price: 3300, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/음료/카페 라떼.png' },
            { id: 3, name: '청포도스파클링', description: '청량한 탄산과 달콤한 청포도가 만났어요', price: 3200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/음료/청포도스파클링.png' },
            { id: 4, name: '자몽스파클링', description: '청량한 탄산과 달콤쌉쌀한 자몽이 만났어요', price: 3200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/음료/자몽스파클링.png' },
            { id: 5, name: '망고주스', description: '망고를 듬뿍 담아 달콤하고 상큼해요', price: 3200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/이삭토스트 건대로데오점/음료/망고주스.png' },
          ]
        },
      ]
    },
    {
      id: 3,
      name: '행컵 건대점',
      isServingStore: true,
      imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/restaurant.jpg',
      categories: [
        {
          id: 1,
          name: '컵밥',
          items: [
            { id: 1, name: '떠먹는삼겹쌈밥', description: '한입에 떠먹는 삼겹살과 상추 그리고 파채에 쌈장소스까지 간편하게 즐기는 삼겹쌈밥', price: 8500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/컵밥/떠먹는삼겹쌈밥.png' },
            { id: 2, name: '우삼겹숙주덮밥', description: '고소한 우삼겹과 아삭한 숙주볶음이 어우러진 우삼겹숙주덮밥', price: 8500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/컵밥/우삼겹숙주덮밥.png' },
            { id: 3, name: '잡채제육콤보', description: '잡채볶음밥 위에 상추채와 제육을 더하여 메뉴 하나에 두가지 맛을 콤보', price: 8500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/컵밥/잡채제육콤보.png' },
            { id: 4, name: '동동가츠동', description: '통살 돈까스에 부드러운 계란이 어우러진 일본식 돈까스 덮밥', price: 8300, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/컵밥/동동가츠동.png' },
            { id: 5, name: '햄볶김치덮밥', description: '고소한 김가루와 햄과 함께 볶음 김치의 완벽한 조화', price: 5500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/컵밥/햄볶김치덮밥.png' },
          ]
        },
        {
          id: 2,
          name: '떡볶이',
          items: [
            { id: 1, name: '코리안로제행떡', description: '로제떡볶이의 심심함을 한방에 날려줄 “매운맛 행떡”', price: 6000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/떡볶이/코리안로제행떡.png' },
            { id: 2, name: '맵떡', description: '맛있게 매워 매일매일 생각나는 맵떡', price: 6000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/떡볶이/맵떡.png' },
            { id: 3, name: '눈꽃치즈라볶이', description: '맛있게 매운 맵떡에 푸짐한 라면사리와 눈꽃치즈의 콜라보', price: 7000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/떡볶이/눈꽃치즈라볶이.png' },
            { id: 4, name: '파불고기떡볶이', description: '소불고기와 파채와 함께하여 더욱 풍성해진 떡볶이', price: 8200, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/떡볶이/파불고기떡볶이.png' },
          ]
        },
        {
          id: 3,
          name: '면',
          items: [
            { id: 1, name: '코리안로제스파게티', description: '행컵만의 특제소스와 크림소스가 만난 매콤고소 스파게티', price: 6000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/면/코리안로제스파게티.png' },
            { id: 2, name: '토마토스파게티', description: '아이들 입맛에 맞춰 토마토를 직접 갈아만든 스파게티', price: 6500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/면/토마토스파게티.png' },
            { id: 3, name: '어묵우동', description: '진한 가쓰오육수에 탱탱한 우동면발과 쫄깃한 어묵', price: 6000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/면/어묵우동.png' },
            { id: 4, name: '얼큰어묵우동', description: '탱탱한 어묵우동에 칼칼하고 얼큰함이 더한 얼큰어묵우동', price: 6300, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/면/얼큰어묵우동.png' },
            { id: 5, name: '김치어묵우동', description: '진한 가쓰오육수와 시원한 김치의 만남 얼큰하고 시원한 김치어묵우동', price: 7000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/면/김치어묵우동.png' },
          ]
        },
        {
          id: 4,
          name: '튀김',
          items: [
            { id: 1, name: '깐풍꼬마군만두', description: '매콤 새콤 달콤! 한입에 쏙 꼬마군만두', price: 3000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/튀김/깐풍꼬마군만두.png' },
            { id: 2, name: '통살돈까스', description: '모든 메뉴와 함께 즐기면 든든함이 두배 통살돈까스', price: 4500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/튀김/통살돈까스.png' },
            { id: 3, name: '찹쌀치즈볼', description: '바삭한 치즈볼을 한입 깨물면 쫄깃한 모짜렐라 치즈 가득', price: 3500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/행컵 건대점/튀김/찹쌀치즈볼.png' },
          ]
        },
      ]
    },
    {
      id: 4,
      name: '신통치킨 건대점',
      isServingStore: false,
      imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/restaurant.jpg',
      categories: [
        {
          id: 1,
          name: '메인메뉴',
          items: [
            { id: 1, name: '방통치킨', description: '담백하고 고소해 가성비 갑! 남녀노소 누구나 좋아하는 방통치킨', price: 10500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/메인메뉴/방통치킨.png' },
            { id: 2, name: '신통치킨', description: '매콤하게 염지하여 숙성한 신통의 대표 메뉴!', price: 11000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/메인메뉴/신통치킨.png' },
            { id: 3, name: '통통세트', description: '신통치킨 방통치킨 2마리 세트에 디핑소스와 음료 1병을 같이 드립니다!', price: 20500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/메인메뉴/통통세트.png' },
            { id: 4, name: '와사비치킨', description: '와사비와 크림소스의 달콤한 조화~', price: 18000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/메인메뉴/와사비치킨.jpg' },
            { id: 5, name: '양념치킨', description: '달콤한 소스에 버무려진 양념치킨', price: 15000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/메인메뉴/양념치킨.jpg' },
          ]
        },
        {
          id: 2,
          name: '사이드메뉴',
          items: [
            { id: 1, name: '이런튀발', description: '매운불닭발을 튀김으로 즐겨요~!', price: 13000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/사이드메뉴/이런튀발.png' },
            { id: 2, name: '똥집후라이드', description: '담백하게 튀겨서 맛있는 똥집후라이드', price: 10000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/사이드메뉴/똥집후라이드.png' },
            { id: 3, name: '똥집양념', description: '바삭함이 살아있는 양념닭똥집', price: 11000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/사이드메뉴/똥집양념.png' },
            { id: 4, name: '매운닭발', description: '콜라겐이 듬뿍~! 쫄깃하고 매운 닭발볶음', price: 13000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/사이드메뉴/매운닭발.png' },
            { id: 5, name: '오뎅탕', description: '따뜻한 국물이 생각날땐 오뎅탕', price: 12000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/신통치킨 건대점/사이드메뉴/오뎅탕.png' },
          ]
        },
      ]
    },
    {
      id: 5,
      name: '겐로쿠우동 건대직영점',
      isServingStore: true,
      imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/restaurant.jpg',
      categories: [
        {
          id: 1,
          name: '우동',
          items: [
            { id: 1, name: '지도리우동', description: '쫄깃한 국내산 생닭과 대파의 불맛 자가제면의 탱탱한 면발이 조화로운 겐로쿠 대표 우동', price: 9000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/우동/지도리우동.jpg' },
            { id: 2, name: '니꾸우동', description: '구운 대파 특제 양념된 소고기가 올라간 스테미너 인기 우동', price: 9000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/우동/니꾸우동.jpg' },
            { id: 3, name: '키즈네우동', description: '기본 우동에 일본 유부가 토핑으로 올라가 특색있고 깔끔한 우동', price: 8500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/우동/키즈네우동.jpg' },
            { id: 4, name: '자루우동', description: '직접 우려낸 깊은 맛의 쯔유에 찍어먹는 차가운 우동', price: 8500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/우동/자루우동.jpg' },
            { id: 5, name: '어린이세트', description: '간이 순한 육수에 푹 삶은 우동면의 키즈네우동+고모꾸메시+요구르트(8세 미만 한정)', price: 5500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/우동/어린이세트.jpg' },
          ]
        },
        {
          id: 2,
          name: '소바',
          items: [
            { id: 1, name: '지도리소바', description: '쫄깃한 국내산 닭과 구운 대파 자가제면의 탱탱한 면발이 조화로운 겐로쿠 대표 소바', price: 9500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/소바/지도리소바.jpg' },
            { id: 2, name: '니꾸소바', description: '구운 대파 특제 양념된 소고기가 올라간 스테미너 인기 소바', price: 9500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/소바/니꾸소바.jpg' },
            { id: 3, name: '키즈네소바', description: '기본 우동에 구운 대파 일본 유부가 토핑으로 올라가 특색있고 깔끔한 소바', price: 9000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/소바/키즈네소바.jpg' },
            { id: 4, name: '자루소바', description: '직접 우려낸 깊은맛의 쯔유에 찍어먹는 차가운 소바', price: 9000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/소바/자루소바.jpg' },
          ]
        },
        {
          id: 3,
          name: '사이드메뉴',
          items: [
            { id: 1, name: '고모꾸메시', description: '연근 우엉 표고버섯 당근 닭등을 넣어 지은 일본 전통 건강밥', price: 2500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/사이드메뉴/고모꾸메시.jpg' },
            { id: 2, name: '이나리', description: '우동과 잘 어울리는 새콤달콤한 일본유부초밥', price: 2500, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/사이드메뉴/이나리.jpg' },
            { id: 3, name: '타코야끼', description: '잘게 다진 문어가 들어간 빵으로 일본의 대표적 간식 맥주와 우동에 곁들이면 아주 좋습니다.', price: 3800, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/사이드메뉴/타코야끼.jpg' },
            { id: 4, name: '고기만두', description: '-', price: 3000, quantity: 0, imageUrl: '/매장 및 메뉴 이미지/겐로쿠우동 건대직영점/사이드메뉴/고기만두.jpg' },
          ]
        },
      ]
    }
  ];
  