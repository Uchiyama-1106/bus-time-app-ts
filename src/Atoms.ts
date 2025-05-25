import { atom } from 'jotai';
import type { Stop, StopTime, Trip } from './Types';
import { TRIPS } from './constant/trips';
import { STOP_TIMES } from './constant/stopTimes';
import { STOPS } from './constant/stops';
import { CALENDAR_DATES } from './constant/calendarDates';

// 使うデータ

const tripIDList: string[] = TRIPS.map((value) => value.trip_id);

type tripsByServiceID = Trip[][];
export const tripsByServiceID: tripsByServiceID = Array.from(
  { length: 5 },
  () => []
);

TRIPS.forEach((value) => {
  const ServiceID = value.service_id;
  if (ServiceID === '平日') {
    tripsByServiceID[0].push(value);
  } else if (ServiceID === '土曜') {
    tripsByServiceID[1].push(value);
  } else if (ServiceID === '日祝') {
    tripsByServiceID[2].push(value);
  } else if (ServiceID === '特別ダイヤ１') {
    tripsByServiceID[3].push(value);
  } else if (ServiceID === '年末・年始') {
    tripsByServiceID[4].push(value);
  }
});

const stop_timesByTripID: StopTime[][] = Array.from(
  { length: tripIDList.length },
  () => new Array<StopTime>()
);

STOP_TIMES.forEach((value1) => {
  const tripIndex: number = tripIDList.findIndex(
    (value2) => value1.trip_id === value2
  );
  if (stop_timesByTripID[tripIndex] === undefined) {
    console.log(tripIndex);
    console.log(value1);
    console.log(tripIDList.includes(value1.trip_id));
  }
  stop_timesByTripID[tripIndex].push(value1);
});

// NowTime 現在時刻 祝日かどうか
export const nowAtom = atom<Date>(new Date());

// BusRoute バス停のリスト 出発するバス停 到着するバス停
export const BusSpotList: string[] = Array.from(
  new Set(
    STOPS.map((value) => {
      return value.stop_name;
    })
  )
);

export const changedStartValueAtom = atom<string>('');

export const startAtom = atom<string>((get) => {
  const Start = get(changedStartValueAtom);
  if (Start === '') {
    return '前橋駅';
  } else {
    return Start;
  }
});

export const changedGoalValueAtom = atom<string>('');

export const goalAtom = atom<string>((get) => {
  const Goal = get(changedGoalValueAtom);
  if (Goal === '') {
    return '群馬大学荒牧';
  } else {
    return Goal;
  }
});

//ServiceIDを判定（平日、土曜、日祝等）
export const BusServiceID = atom((get) => {
  const now = get(nowAtom);
  const nowY: string = now.getFullYear().toString();
  type nowM = (n: Date) => string;
  const nowM = (n = now) =>
    n.getMonth() + 1 >= 10
      ? (n.getMonth() + 1).toString()
      : '0' + (n.getMonth() + 1).toString();
  type nowD = (n: Date) => string;
  const nowD = (n: Date = now) =>
    n.getMonth() + 1 >= 10
      ? (n.getMonth() + 1).toString()
      : '0' + (n.getMonth() + 1).toString();
  const nowYMD: string = nowY + nowM + nowD;
  const judgeServiceID = CALENDAR_DATES.find(
    (value) => value.date === nowYMD && value.exception_type === '1'
  );
  if (judgeServiceID) {
    return judgeServiceID.service_id;
  } else {
    if (now.getDay() === 6) {
      return '土曜';
    } else if (now.getDay() === 0) {
      return '日祝';
    } else {
      return '平日';
    }
  }
});

const busTrips = atom((get) => {
  const ServiceID = get(BusServiceID);
  let ans: Trip[] = [];
  if (ServiceID === '平日') ans = tripsByServiceID[0];
  else if (ServiceID === '土曜') ans = tripsByServiceID[1];
  else if (ServiceID === '日祝') ans = tripsByServiceID[2];
  else if (ServiceID === '特別ダイヤ１') ans = tripsByServiceID[3];
  else if (ServiceID === '年末・年始') ans = tripsByServiceID[4];
  else console.log('ダイヤが見つかりません');
  return ans;
});

const busStartTransrateToID = atom<Stop[]>((get) => {
  const Start = get(startAtom);
  const StartID: Stop[] = STOPS.filter((value) => value.stop_name === Start);
  return StartID;
});

const busGoalTransrateToID = atom<Stop[]>((get) => {
  const Goal = get(goalAtom);
  const GoalID: Stop[] = STOPS.filter((value) => value.stop_name === Goal);
  return GoalID;
});

const saveList: (Stop | undefined)[] = BusSpotList.map((value) => {
  return STOPS.find((item) => item.stop_name === value);
}).filter(Boolean);
type distanceList = {
  name: string;
  distance: number;
};

const nearTargetStops: string[][] = [];

const filteredSaveList: Stop[] = saveList.filter(
  (item): item is Stop => item !== undefined
);

for (let i = 1; i < saveList.length; i++) {
  const baseStop: Stop = filteredSaveList[i];
  const distanceList: distanceList[] = [];
  for (let j = 1; j < filteredSaveList.length; j++) {
    const compereStop: Stop = filteredSaveList[j];
    if (compereStop === baseStop) {
      continue;
    } else {
      const lat: number =
        (Number(compereStop.stop_lat) - Number(baseStop.stop_lat)) ** 2;
      const lon: number =
        (Number(compereStop.stop_lon) - Number(baseStop.stop_lon)) ** 2;
      const distance: number = lat + lon;
      distanceList.push({ name: compereStop.stop_name, distance: distance });
    }
  }
  distanceList.sort((a, b) => a.distance - b.distance);
  nearTargetStops.push([
    baseStop.stop_name,
    distanceList[0].name,
    distanceList[1].name,
  ]);
}

const sort: () => string[] = () => {
  const baseStop: Stop =
    filteredSaveList.find((value) => value.stop_name === '前橋駅') ||
    filteredSaveList[0];
  const distanceList: distanceList[] = [];
  for (let i = 1; i < saveList.length; i++) {
    const compereStop: Stop = filteredSaveList[i];
    const lat: number =
      (Number(compereStop.stop_lat) - Number(baseStop.stop_lat)) ** 2;
    const lon: number =
      (Number(compereStop.stop_lon) - Number(baseStop.stop_lon)) ** 2;
    const distance: number = lat + lon;
    distanceList.push({ name: compereStop.stop_name, distance: distance });
  }
  distanceList.sort((a, b) => a.distance - b.distance);
  return distanceList.map((value) => value.name);
};

export const sortedBusSpotList = sort();

const NearbusStartTransrateToID = atom<Stop[][]>((get) => {
  const Start = get(startAtom);
  const NearStart: string[] =
    nearTargetStops.find((value) => value[0] === Start) || [];
  const StartID1: Stop[] = STOPS.filter(
    (value) => value.stop_name === NearStart[1]
  );
  const StartID2: Stop[] = STOPS.filter(
    (value) => value.stop_name === NearStart[2]
  );
  return [StartID1, StartID2];
});

export const NearbusGoalTransrateToID = atom<Stop[][]>((get) => {
  const Goal = get(goalAtom);
  const NearGoal: string[] =
    nearTargetStops.find((value) => value[0] === Goal) || [];
  const GoalID1: Stop[] = STOPS.filter(
    (value) => value.stop_name === NearGoal[1]
  );
  const GoalID2: Stop[] = STOPS.filter(
    (value) => value.stop_name === NearGoal[2]
  );
  return [GoalID1, GoalID2];
});

export const stopInfo = atom<Stop[]>((get) => {
  const Start: Stop[] = get(busStartTransrateToID);
  const Goal: Stop[] = get(busGoalTransrateToID);
  const NearStart: Stop[] = get(NearbusStartTransrateToID).flat();
  const NearGoal: Stop[] = get(NearbusGoalTransrateToID).flat();
  return [...Start, ...Goal, ...NearStart, ...NearGoal];
});

const oneDigitCheck = (value: number) => {
  if (value >= 10) {
    return value.toString();
  } else {
    return '0' + value.toString();
  }
};

export const busTime = atom((get) => {
  const Now = get(nowAtom);
  const Start: Stop[] = get(busStartTransrateToID);
  const Goal: Stop[] = get(busGoalTransrateToID);
  const NearStart: Stop[][] = get(NearbusStartTransrateToID);
  const NearGoal: Stop[][] = get(NearbusGoalTransrateToID);
  const Stop_times: StopTime[][] = [...stop_timesByTripID];
  const TripID = [...tripIDList];
  // Trips => TripIDでインデックスを取得 => Stop_timesで該当するインデックスを検索=>Startが現在時刻より後に出発時刻が設定されているか、
  const Trips: Trip[] = get(busTrips);

  const nowTime: number = Number(
    Now.getHours().toString() +
      oneDigitCheck(Now.getMinutes()) +
      oneDigitCheck(Now.getSeconds())
  );
  const StartIDList = Start.map((value) => value.stop_id);
  const GoalIDList = Goal.map((value) => value.stop_id);
  const List: Array<[Trip, StopTime, StopTime]> = [];
  // Trip(便)ごとに
  let firstStop: number | null = null;

  for (let i = 0; i < Trips.length; i++) {
    const trip: Trip = Trips[i];
    const tripIndex: number = TripID.findIndex(
      (value) => value === trip.trip_id
    );
    const Stop_time: StopTime[] = Stop_times[tripIndex];
    let StartFlag: boolean = false;
    let GoalFlag: boolean = false;
    let StartStop_time: StopTime = {
      trip_id: '',
      arrival_time: '',
      departure_time: '',
      stop_id: '',
    };
    let GoalStop_time: StopTime = {
      trip_id: '',
      arrival_time: '',
      departure_time: '',
      stop_id: '',
    };

    // 到着情報ごとに
    for (let j = 0; j < Stop_time.length && List.length < 5; j++) {
      const depTime: number = Number(
        Stop_time[j].departure_time.split(':').join('')
      );
      if (StartFlag === false) {
        if (StartIDList.includes(Stop_time[j].stop_id) && depTime >= nowTime) {
          StartFlag = true;
          StartStop_time = Stop_time[j];
        }
      }

      if (StartFlag === true) {
        if (GoalIDList.includes(Stop_time[j].stop_id)) {
          GoalFlag = true;
          GoalStop_time = Stop_time[j];
          break;
        }
      }
    }
    if (StartFlag === true && GoalFlag === true) {
      if (List.length === 1) {
        firstStop = i;
      }
      List.push([trip, StartStop_time, GoalStop_time]);
    }
  }

  let targetbustripId: string[] = List.map((value) => value[0].trip_id);

  const checkNearTarget = (nearStartStop: Stop[], nearGoalStop: Stop[]) => {
    const StartIDList = nearStartStop.map((value) => value.stop_id);
    const GoalIDList = nearGoalStop.map((value) => value.stop_id);
    const checkStart: number =
      firstStop === null || firstStop < 15 ? 0 : firstStop - 15;
    const checkEnd: number =
      firstStop === null || firstStop > Trips.length - 10
        ? Trips.length
        : firstStop + 10;
    for (let i: number = checkStart; i < checkEnd; i++) {
      const trip: Trip = Trips[i];
      const tripIndex: number = TripID.findIndex(
        (value) => value === trip.trip_id
      );

      const Stop_time: StopTime[] = Stop_times[tripIndex];
      let StartFlag: boolean = false;
      let GoalFlag: boolean = false;
      let StartStop_time: StopTime = {
        trip_id: '',
        arrival_time: '',
        departure_time: '',
        stop_id: '',
      };
      let GoalStop_time: StopTime = {
        trip_id: '',
        arrival_time: '',
        departure_time: '',
        stop_id: '',
      };
      // 到着情報ごとに
      for (let j = 0; j < Stop_time.length; j++) {
        const depTime: number = Number(
          Stop_time[j].departure_time.split(':').join('')
        );
        if (StartFlag === false) {
          if (
            StartIDList.includes(Stop_time[j].stop_id) &&
            depTime >= nowTime
          ) {
            StartFlag = true;
            StartStop_time = Stop_time[j];
          }
        }

        if (StartFlag === true) {
          if (GoalIDList.includes(Stop_time[j].stop_id)) {
            GoalFlag = true;
            GoalStop_time = Stop_time[j];
            break;
          }
        }
      }

      if (
        StartFlag === true &&
        GoalFlag === true &&
        !targetbustripId.includes(trip.trip_id)
      ) {
        List.push([trip, StartStop_time, GoalStop_time]);
      }
      targetbustripId = List.map((value) => value[0].trip_id);
    }
  };
  checkNearTarget(Start, NearGoal[0]);
  checkNearTarget(NearStart[0], Goal);
  checkNearTarget(Start, NearGoal[1]);
  checkNearTarget(NearStart[1], Goal);
  checkNearTarget(NearStart[0], NearGoal[0]);
  checkNearTarget(NearStart[1], NearGoal[1]);

  List.sort(
    (a, b) =>
      Number(a[1].departure_time.split(':').join('')) -
      Number(b[1].departure_time.split(':').join(''))
  );
  const ansList = List.filter((_value, index) => index < 5);

  return ansList;
});
