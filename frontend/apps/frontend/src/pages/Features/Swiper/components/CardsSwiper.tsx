/*
 * @Description: 卡片特效
 */

import 'swiper/css/effect-cards';

import { map } from 'lodash-es';
import { FC } from 'react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/utils';

const CardsSwiper: FC = () => {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper effect="cards" grabCursor loop modules={[EffectCards]} style={{
      width: 240,
      height: 320,
    }}>
      {
        map(imgs, (src: string) => (
          <SwiperSlide key={src}>
            <img
              src={src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
export default CardsSwiper;