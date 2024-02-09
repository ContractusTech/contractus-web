import 'swiper/css'

import { FC } from 'react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'

import { useStatistics } from '@/api/hooks/useStatistics'

import StatisticsListItem from './StatisticsListItem'

const StatisticsList: FC = () => {
  const { statistics } = useStatistics()

  return (
    <SwiperComponent
      modules={[FreeMode, Mousewheel]}
      slidesPerView={'auto'}
      spaceBetween={8}
      mousewheel
      watchOverflow
      threshold={10}
      grabCursor={true}
    >
      {statistics &&
        statistics.map((stat, index) => (
          <SwiperSlide key={index} className="!h-auto !w-auto cursor-default">
            <StatisticsListItem amount={stat.amount} type={stat.type} />
          </SwiperSlide>
        ))}
    </SwiperComponent>
  )
}

export default StatisticsList
