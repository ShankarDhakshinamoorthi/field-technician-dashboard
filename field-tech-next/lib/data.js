export const visits = [
  {"Visit_ID":"V001","Date":"2024-01-05","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"45","Site_ID":"S101"},
  {"Visit_ID":"V002","Date":"2024-01-06","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"90","Site_ID":"S202"},
  {"Visit_ID":"V003","Date":"2024-01-07","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"30","Site_ID":"S303"},
  {"Visit_ID":"V004","Date":"2024-01-08","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"120","Site_ID":"S101"},
  {"Visit_ID":"V005","Date":"2024-01-09","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"40","Site_ID":"S404"},
  {"Visit_ID":"V006","Date":"2024-01-10","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"85","Site_ID":"S505"},
  {"Visit_ID":"V007","Date":"2024-01-11","Technician":"Emily Davis","Region":"West","Equipment_Type":"Firewall","Test_Result":"Pass","Duration_Minutes":"55","Site_ID":"S606"},
  {"Visit_ID":"V008","Date":"2024-01-12","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"95","Site_ID":"S707"},
  {"Visit_ID":"V009","Date":"2024-01-13","Technician":"Emily Davis","Region":"West","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"35","Site_ID":"S808"},
  {"Visit_ID":"V010","Date":"2024-01-14","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"110","Site_ID":"S909"},
  {"Visit_ID":"V011","Date":"2024-01-15","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"42","Site_ID":"S101"},
  {"Visit_ID":"V012","Date":"2024-01-16","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"88","Site_ID":"S202"},
  {"Visit_ID":"V013","Date":"2024-01-17","Technician":"Emily Davis","Region":"West","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"38","Site_ID":"S303"},
  {"Visit_ID":"V014","Date":"2024-01-18","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Switch","Test_Result":"Pass","Duration_Minutes":"60","Site_ID":"S404"},
  {"Visit_ID":"V015","Date":"2024-01-19","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"130","Site_ID":"S505"},
  {"Visit_ID":"V016","Date":"2024-01-20","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"48","Site_ID":"S606"},
  {"Visit_ID":"V017","Date":"2024-01-21","Technician":"Emily Davis","Region":"West","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"92","Site_ID":"S707"},
  {"Visit_ID":"V018","Date":"2024-01-22","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"33","Site_ID":"S808"},
  {"Visit_ID":"V019","Date":"2024-01-23","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Switch","Test_Result":"Pass","Duration_Minutes":"65","Site_ID":"S909"},
  {"Visit_ID":"V020","Date":"2024-01-24","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"115","Site_ID":"S101"},
  {"Visit_ID":"V021","Date":"2024-02-01","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"44","Site_ID":"S202"},
  {"Visit_ID":"V022","Date":"2024-02-02","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"125","Site_ID":"S303"},
  {"Visit_ID":"V023","Date":"2024-02-03","Technician":"Emily Davis","Region":"West","Equipment_Type":"Switch","Test_Result":"Pass","Duration_Minutes":"58","Site_ID":"S404"},
  {"Visit_ID":"V024","Date":"2024-02-04","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"50","Site_ID":"S505"},
  {"Visit_ID":"V025","Date":"2024-02-05","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"105","Site_ID":"S606"},
  {"Visit_ID":"V026","Date":"2024-02-06","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"37","Site_ID":"S707"},
  {"Visit_ID":"V027","Date":"2024-02-07","Technician":"Emily Davis","Region":"West","Equipment_Type":"Firewall","Test_Result":"Fail","Duration_Minutes":"98","Site_ID":"S808"},
  {"Visit_ID":"V028","Date":"2024-02-08","Technician":"John Carter","Region":"Northeast","Equipment_Type":"Switch","Test_Result":"Pass","Duration_Minutes":"62","Site_ID":"S909"},
  {"Visit_ID":"V029","Date":"2024-02-09","Technician":"Sarah Lee","Region":"Southeast","Equipment_Type":"Router","Test_Result":"Pass","Duration_Minutes":"41","Site_ID":"S101"},
  {"Visit_ID":"V030","Date":"2024-02-10","Technician":"Mike Brown","Region":"Midwest","Equipment_Type":"Switch","Test_Result":"Fail","Duration_Minutes":"88","Site_ID":"S202"},
];

export const kpis = {
  total: 30,
  passes: 17,
  fails: 13,
  passRate: 56.7,
};

export const regionFailures = [
  { region: 'Northeast', failures: 4 },
  { region: 'Midwest',   failures: 4 },
  { region: 'Southeast', failures: 3 },
  { region: 'West',      failures: 2 },
];

export const equipFailures = [
  { type: 'Firewall', failures: 7 },
  { type: 'Switch',   failures: 6 },
  { type: 'Router',   failures: 0 },
];

export const techStats = [
  { name: 'John Carter',  visits: 8, passes: 4, fails: 4, avgDuration: 77.9, passRate: 50.0 },
  { name: 'Sarah Lee',    visits: 8, passes: 5, fails: 3, avgDuration: 65.4, passRate: 62.5 },
  { name: 'Mike Brown',   visits: 8, passes: 4, fails: 4, avgDuration: 75.2, passRate: 50.0 },
  { name: 'Emily Davis',  visits: 6, passes: 4, fails: 2, avgDuration: 62.7, passRate: 66.7 },
];
