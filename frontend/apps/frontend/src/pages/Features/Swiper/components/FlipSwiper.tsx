/*
 * @Description: 翻转
 */

import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { map } from 'lodash-es';
import { FC } from 'react';
import { EffectFlip, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/utils';

const FlipSwiper: FC = () => {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="flip"
      grabCursor
      loop
      navigation
      pagination={{ clickable: true }}
      modules={[EffectFlip, Pagination, Navigation]}
      style={{
        width: 320,
        height: 320,
      }}
    >
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
export default FlipSwiper;
