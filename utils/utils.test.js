import { ExpansionPanelActions } from '@material-ui/core';
import { getTwoStatus, parseFeeds } from './utils.js';

describe('feedees are corrctly parsed from', () => {
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
})

