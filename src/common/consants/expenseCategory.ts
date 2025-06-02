import * as categoryNames from './categoryName';

export const food = '#e7345f';
export const housing = '#9bd248';
export const utils = '#FFD93D';
export const transportation = '#6C5CE7';
export const health = '#FF8B94';
export const hobby = '#FF6B35';
export const shopping = '#FF9F1C';
export const saving = '#2EC4B6';
export const others = '#95A5A6';

export const categoryColors: { [key: string]: string } = {
  [categoryNames.food]: food, // 식사, 카페, 배달 등
  [categoryNames.housing]: housing, // 월세, 관리비
  [categoryNames.utils]: utils, // 전기, 수도, 가스, 휴대폰, 인터넷
  [categoryNames.transportation]: transportation, // 대중교통, 주유, 차량 유지비
  [categoryNames.health]: health, // 병원, 약국, 헬스장
  [categoryNames.hobby]: hobby, // 영화, 게임, 운동, 레저 활동
  [categoryNames.shopping]: shopping, // 의류, 잡화, 온라인 쇼핑
  [categoryNames.saving]: saving, // 적금, 펀드, 주식
  [categoryNames.others]: others, // 분류 어려운 지출
};

export const getCategoryColor = (category: string) => {
  return categoryColors[category] || others;
};
