import { csv } from 'd3-fetch';

const l = (x) => console.log(x);

csv(
  'https://raw.githubusercontent.com/descarteslabs/DL-COVID-19/master/DL-us-m50.csv'
).then((data) => l(data));
