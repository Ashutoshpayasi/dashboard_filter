import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ProgressBar } from 'react-bootstrap';
import "./Dashbord.css"
import SolidGauge from 'highcharts/modules/solid-gauge';
import { GiLevelThree } from "react-icons/gi"
import { ImHeart } from "react-icons/im"
import { CgPathUnite } from "react-icons/cg"
import { ImEarth } from "react-icons/im"
import { TbArrowBigRightFilled, TbGauge } from "react-icons/tb"
import { TbMapPinFilled } from "react-icons/tb"
import HighchartsMore from 'highcharts/highcharts-more';
import Filter from '../FilterBox/Filter';
import { dashbordContext } from '../../contex/dashbordContex'
import { useContext } from 'react'
import { useEffect } from 'react'
HighchartsMore(Highcharts);
SolidGauge(Highcharts)

function Dashbord() {
  const {dashbordId,filterShow}=useContext(dashbordContext)
  const [data,seData]=useState({})
  
  useEffect(()=>{
    fetch(`https://filter-backend.onrender.com/${dashbordId}`)
    .then(res=>res.json())
  .then(result=>{
    console.log(result)
   seData(result)
  })
  
  },[])
  function levelSpin(color,di) {
    return {
      chart: {
        type: 'pie',
        width: 200,
        height: 160,
      },
      title: null,


      series: [{
        name: 'Percentage',
        data: [{
          name: 'Percentage',
          y: di*4,
          color: `${color}`
        }, {
          name: 'Rest',
          y: 100-di*4,
          color: 'rgb(199, 199, 199)'
        }],
        innerSize: '70%',
        startAngle: -90,
        endAngle: 270,
        center: ['50%', '50%']
      }],
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: false
        }
      }
    }
  }
  const yearchart = {
   
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Years Passed'
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: 'rgb(199, 199, 199)',
        borderWidth: 0,
        outerRadius: '100%',
        innerRadius: '90%'
      }]
    },
    yAxis: {
      min: 0,
      max: 10,
      lineWidth: 0,
      tickPositions: []
    },
    series: [{
      name: null,
      data: [data.end_year],
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
          ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
          '<span style="font-size:12px;color:silver">Years</span></div>'
      },
      tooltip: {
        valueSuffix: ' years'
      }
    }, {
      name: 'Gauge',
      data: [5],
      type: 'gauge',
      dial: {
        backgroundColor: '#0099cc',
        baseWidth: 10,
        topWidth: 1,
        baseLength: '80%', // arrow length
        radius: '100%',
        rearLength: 0
      },
      pivot: {
        radius: 10,
        backgroundColor: '#0099cc'
      },
      tooltip: {
        enabled: false
      }
    }]
  }
  
  return (
    <div className='dashbord'>
    <div className='parent'>
      <section className='intensity'>
        <GiLevelThree className='intLogo' />
        <h4>Intensity</h4>
        <ProgressBar className='progressbar' variant="danger" now={data.intensity*2} />
        <div className='spinner'>
          <HighchartsReact
            highcharts={Highcharts}
            options={levelSpin("red",data.intensity)}
          />
        </div>
        <p className='spinRate'>{data.intensity}</p>

      </section>

      <section className='likelihood'>
        <ImHeart className='likeLogo' />
        <h4>Likelihood</h4>
        <ProgressBar className='progressbar' variant="info" now={data.likelihood*2} />
        <div className='spinner'>
          <HighchartsReact
            highcharts={Highcharts}
            options={levelSpin("rgb(140, 193, 211)",data.likelihood)}
          />
        </div>
        <p className='spinRate'>{data.likelihood} </p>
      </section>
      <section className='relevance'>
        < CgPathUnite className='relLogo' />
        <h4>Relevance</h4>
        <ProgressBar className='progressbar' variant="warning" now={data.relevance*2} />
        <div className='spinner'>
        <HighchartsReact 
    highcharts={Highcharts}
    options={levelSpin("rgb(239, 205, 143)",data.relevance)}
  />
        </div>
        <p className='spinRate'>{data.relevance} </p>
      </section>
      <section className='title'>
        <h3>{data.title}</h3>
        <div className="country">
          <section >
            {/* TbMapPinFilled */}
            <TbMapPinFilled className='countryLogo' />
            <h4>Country</h4>
            <TbArrowBigRightFilled className='countryLogo' />
            <h4>{data.country}</h4>

          </section>
          <section>
            <ImEarth className='countryLogo' />

            <h4>Region</h4>
            <TbArrowBigRightFilled className='countryLogo' />
            <h4>{data.region}</h4>


          </section>
        </div>
      </section>
      <section className='year'>
        <HighchartsReact
          highcharts={Highcharts}
          options={yearchart}
        />
      </section>
      {filterShow &&<Filter  />}
    </div>
    </div>
  )
}

export default Dashbord
