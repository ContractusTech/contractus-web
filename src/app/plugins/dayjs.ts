import 'dayjs/locale/ru'

import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import isToday from 'dayjs/plugin/isToday'
import timezone from 'dayjs/plugin/timezone'
import UTC from 'dayjs/plugin/utc'

dayjs.extend(calendar)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(isoWeek)
dayjs.extend(isToday)
dayjs.extend(UTC)
dayjs.extend(timezone)

dayjs.locale('ru')
