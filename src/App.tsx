import React from 'react';
import './App.css';

const yearAndMonthEqual = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

const totalMonths = (d: Date): number =>
  d.getFullYear() * 12 + d.getMonth() + 1;

const today = new Date();

function App() {
  const people = [
    { name: 'Papa', born: new Date("9/8/1985") },
    { name: 'Mama', born: new Date("2/20/1988") },  
    { name: 'Cooper', born: new Date("7/31/2011") },  
    { name: 'Maizy', born: new Date("7/31/2012") },  
    { name: 'Sawyer', born: new Date("2/12/2016") },  
    { name: 'Fiona', born: new Date("6/5/2018") },  
    { name: 'Rowan', born: new Date("10/14/2021") }
  ];
  //const nextDay = (d: Date): number => d.setDate(d.getDate()+1);
  const nextMonth = (d: Date): number => d.setMonth(d.getMonth()+1);
  const days: Date[] = (() => {
    let ds = [];
    let min = new Date("1/1/1985");
    let max = new Date("9/8/2085");
    for(let d=min; d<max; nextMonth(d)){
      ds.push(new Date(d));
    }
    return ds;
  })();
  return (
    <div className="App">
      <a href="#present" className="fab">Today</a>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            {people.map(p => 
              <th key={p.name}>
                <a href={`#${p.name}-born`} className="vertical">
                  {p.name}
                </a>
              </th>)}
          </tr>
        </thead>
        <tbody>
          {days.map(d => {
            let present = yearAndMonthEqual(d, today);
            return <tr key={d.toString()}>
              <th className={present ? "present" :""}>
                {d.getFullYear()}
                {present && <span className="row-anchor" id="present"/>}
              </th>
              <th className={present ? "present" :""}>
                {d.getMonth() + 1}
              </th>
              {people.map(p => {
                let born = yearAndMonthEqual(d, p.born);
                let monthsOld = (totalMonths(d) - totalMonths(p.born));
                let yearsOld = Math.floor(monthsOld/12);
                let alive = 0 <= yearsOld;
                let birthMonth = monthsOld % 12 === 0;
                let birthMonthEve = monthsOld % 12 === 11;
                return <td key={p.name} className={(born ? "birth" : "") + (alive && birthMonth ? " range-start" : birthMonthEve ? " range-end" : alive ? " range-middle": "")}>
                  {born && <span className="row-anchor" id={p.name + "-born"}/>}
                  <span>{alive ? yearsOld : '-'}</span>
                </td>
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
