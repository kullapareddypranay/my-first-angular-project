import { Component, ViewChild , OnInit,DoCheck} from '@angular/core';
import { ChartDataSets,ChartType } from "chart.js";
import {Color,Label,MultiDataSet} from 'ng2-charts';
import { ApiService } from './api.service';
import { MatTableDataSource } from "@angular/material/table";


export interface CasesList {
  state:string;
  district:string;
  cases:number;
  deceased:number;
  recovered:number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'List';
  // recipeName:string='';
  // @ViewChild('recipeName') listInput;
  // recipes=[];

  
  ngOnInit() {
    this.caseList()
    this.dailyCaseList()
   
  }

 

  constructor(private caseService:ApiService) { }
  
 


  lineData:ChartDataSets[]=[
    {data:[],label:'covid cases'},

  ]
  lineLabel:Label[]=['jan','feb','mar','apr','may'];
  lineOPtions={
    responsive:true
  };

  lineColors:Color[]=[
    {
      borderColor:'black',
      backgroundColor:'rgba(100,0,0,0.30)'
    }
  ];

  lineLegend=true;
  linePlugins=[];
  lineType='line';

  cases:[]=[];
  caseData:CasesList[]=[];

  caseList(){
    this.caseService.getDetails().subscribe((res:any)=>{
      this.cases=res.cases_time_series;
      this.cases.forEach((ele:any)=>{
        this.lineData[0].data.push(ele.totalconfirmed);
        this.lineLabel.push(ele.date);
       
      })
    })
  }

  dailyCaseList(){
    this.caseService.getDailyCases().subscribe((res:Object)=>{
      Object.keys(res).forEach((ele:any)=>{
        // console.log(res[ele])
        Object.keys(res[ele].districts).forEach((data:any)=>{
          // console.log(res[ele].districts[data])
          var details={
            state:ele,
            district:data,
            cases:res[ele].districts[data].total.confirmed,
            deceased:res[ele].districts[data].total.deceased,
            recovered:res[ele].districts[data].total.recovered
          }
          // console.log(details);
          this.caseData.push(details)
         
        })
       
      })
    })
  }

  displayedColumns:string[]=['state','district','cases','deceased','recovered'];
  dataSource=new MatTableDataSource(this.caseData);

 applyFilter(event:Event){
   const value=(event.target as HTMLInputElement).value;
   this.dataSource.filter=value.trim();
 }

}
