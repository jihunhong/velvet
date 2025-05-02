import { Bus, ChartCandlestick, Flame, Hamburger, Heart, Home, MoreHorizontal, ShoppingBag, Zap } from 'lucide-react';
import React from 'react';
import * as colors from '../../common/colors/expenseCategory';

interface CategoryIconProps {
  icon: React.ReactNode;
  color: string;
  size?: number;
}

interface CategoryIconComponent extends React.FC<CategoryIconProps> {
  Food: JSX.Element;
  Housing: JSX.Element;
  Utils: JSX.Element;
  Transportation: JSX.Element;
  Health: JSX.Element;
  Hobby: JSX.Element;
  Shopping: JSX.Element;
  Saving: JSX.Element;
  Others: JSX.Element;
}

const CategoryIcon: CategoryIconComponent = ({ icon, color, size = 24 }) => {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{
        backgroundColor: color,
        width: `${size + 16}px`,
        height: `${size + 16}px`,
      }}
    >
      {icon}
    </div>
  );
};

// 식비 (식사, 카페, 배달 등)
CategoryIcon.Food = <CategoryIcon icon={<Hamburger color="white" size="18" />} color={colors.food} size={18} />;

// 주거비 (월세, 관리비)
CategoryIcon.Housing = <CategoryIcon icon={<Home color="white" size="18" />} color={colors.housing} size={18} />;

// 공과금·통신비 (전기, 수도, 가스, 휴대폰, 인터넷)
CategoryIcon.Utils = <CategoryIcon icon={<Zap color="white" size="18" />} color={colors.utils} size={18} />;

// 교통비 (대중교통, 주유, 차량 유지비)
CategoryIcon.Transportation = <CategoryIcon icon={<Bus color="white" size="18" />} color={colors.transportation} size={18} />;

// 의료·건강 (병원, 약국, 헬스장)
CategoryIcon.Health = <CategoryIcon icon={<Heart color="white" size="18" fill="white" />} color={colors.health} size={18} />;

// 취미·여가 (영화, 게임, 운동, 레저 활동)
CategoryIcon.Hobby = <CategoryIcon icon={<Flame color="white" size="18" />} color={colors.hobby} size={18} />;

// 쇼핑 (의류, 잡화, 온라인 쇼핑)
CategoryIcon.Shopping = <CategoryIcon icon={<ShoppingBag color="white" size="18" />} color={colors.shopping} size={18} />;

// 저축·투자 (적금, 펀드, 주식)
CategoryIcon.Saving = <CategoryIcon icon={<ChartCandlestick color="white" size="18" />} color={colors.saving} size={18} />;

// 기타 (분류 어려운 지출)
CategoryIcon.Others = <CategoryIcon icon={<MoreHorizontal color="white" size="18" />} color={colors.others} size={18} />;

export default CategoryIcon;
