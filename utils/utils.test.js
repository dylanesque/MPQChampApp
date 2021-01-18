import { getFourStatus, getThreeStatus, getTwoStatus, parseFeeds } from './utils.js';

describe('feedees are corrctly parsed from', () => {
   test('two star characters', () => {
     expect(parseFeeds('Captain Marvel (Modern)')).toEqual([
       'Captain Marvel (Modern)',
       'Captain Marvel (Modern)',
     ]);
   });
  test('three star characters', () => {
    expect(
      parseFeeds('Jean Grey (All New X-Men),Jubilee (Uncanny X-Men)')
    ).toEqual(['Jean Grey (All New X-Men)', 'Jubilee (Uncanny X-Men)']);
  });
});

describe('next reward is calculated for', () => {
  test('two star characters', () => {
    expect(getTwoStatus(143, 'Ares (Dark Avengers)')).toEqual(
      '1 levels to: Mighty Recruit Token'
    );
  });
   test('three star characters', () => {
     expect(getThreeStatus(196, 'Jubilee (Uncanny X-Men)')).toEqual(
       '4 level(s) to: Jubilee (Uncanny X-Men) shards'
     );
   });
  
   test('older four star characters', () => {
     expect(getFourStatus(345, 'Rescue (Pepper Potts)')).toEqual(
       '2 level(s) to: Rescue (Pepper Potts) shards'
     );
   });
  
   test('newer four star characters', () => {
     expect(getFourStatus(331, 'Captain America (Infinity War)')).toEqual(
       '4 level(s) to: Captain America (Infinity War) shards'
     );
   });
})
