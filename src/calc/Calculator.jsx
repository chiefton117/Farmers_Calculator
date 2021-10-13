import React from "react"
import { Table } from 'react-bootstrap';
import SilvoGraph from './SilvoGraph.jsx'
import SilvoBar from './SilvoBar.jsx'
import * as d3 from "d3";

const yrs = 2;

const opts = ["WP", "WOP"];

// const labels = ["",
// 				"Return Per...", 
// 				"Return Per...(" + yrs + " yrs)", 
// 				"Profit Per...", 
// 				"Profit Per...(" + yrs + " yrs)", 
// 				"Total Cost",
// 				"Total Cost...(" + yrs + " yrs)",
// 				"Total Revenue",
// 				"Total Revenue...(" + yrs + " yrs)",
// 				"NPV"]


const labels = ["Per Acre", 
				"Total Area"]





function Calculator(props) {

// How many sq ft in an acre
const acreFt = 43560;

// At what age is a tree mature enough to start producing profits
const maturingYears = 10;


// Derive calculated values from props
let netRevenue = props.silvoPasture[0][0] - props.silvoPasture[1][0];
let productivity = props.silvoPasture[7][0] / 100;

// Read other props in for easier access
let plantingCost = props.silvoPasture[3][0];
let maintenance = props.silvoPasture[5][0];
let cropPrice = props.silvoPasture[8][0];
let treeYield = props.silvoPasture[6][0];
let treeSpacing = props.silvoPasture[2][0];

//let treesPerAcre = props.silvoPasture[4][0];
let treesPerAcre = acreFt / (treeSpacing ** 2);




// Main method for calculations - this should be called on render to calculate all table cells
// Each individual calculation method will output a tuple of [Title(Unit), Value With Project(WP), Value Without Project(WOP)]
// e.g costPerTree() may return ["Cost Per Tree", "$5", "$2"]
function calculate(land, yrs) {
	var rows = [
	returnPer(),
	returnPerYr(yrs),
	profitPer(),
	profitPerYr(yrs),
	totalCost(),
	totalCostYr(yrs),
	totalRevenue(),
	totalRevenue(yrs),
	npv()
	];

	return rows;
}


function totalManualLand() {
	let land = 0;
	props.crops.forEach(crop => land += parseFloat(crop.amount))
	return [land.toFixed(2), 0];
}
function costPer() {
	return [(props.land * 5).toFixed(2), (props.land * 3).toFixed(2)];
}
function costPerYr(yrs) {
	const costs = costPer();
	return [(costs[0] * 365).toFixed(2), 0];
}
function returnPer() {
	return [100, 100];
}
function returnPerYr(yrs) {
	const costs = returnPer();
	return [costs[0] * 365, costs[1] * 365];
}
function profitPer() {
	return [100, 100];
}
function profitPerYr(yrs) {
	const costs = profitPer();
	return [costs[0] * 365, costs[1] * 365];
}
function totalProjArea(area) {
	return [area, area];
}
function totalCost() {
	return [100, 100];
}
function totalCostYr(yrs) {
	const costs = totalCost();
	return [costs[0] * 365, costs[1] * 365];
}
function totalRevenue(yrs) {
	return [101010, 100000];
}

// Net Present Value(NPV) = Benefits(B) - Costs(C)
// NPV = PV(B) - PV(C)
function npv() {

	let data = [];

	d3.range(1, props.length+1).forEach(d =>
		data.push({
			year: d,
			revenue: (parseInt(d) >= maturingYears ? (treesPerAcre*cropPrice*treeYield) : 0) + netRevenue*productivity,
			cost: (parseInt(d) === 1 ? treesPerAcre*plantingCost : treesPerAcre * maintenance)
	}));


	let npvr = 0;
	let npvc = 0;

	
	for(var i = 0; i<data.length;i++) {
		npvr += (data[i].revenue/((1+props.rate)**i));
		npvc += (data[i].cost/((1+props.rate)**i));
	}



	return [npvr,npvc];
	// var revenue = totalRevenue();
	// var cost = totalCost();
	// return [revenue[0]-cost[0], revenue[1]-cost[1]];
}



const rows = calculate(props.land, 2);
return (


		<>
			<Table className="box" className="mt-5" responsive="lg" striped bordered hover>
				<thead>

				</thead>
				<tbody>
						<tr>
							<td></td>

							<tr>
							{labels.map((label,idx) => (
								
									<th key={idx}>
										{label}
									</th>
								
								))}
							</tr>

						</tr>
						{props.options.map((opt,i) => (
							<tr key={i}>
								<td>
								{opt}
								</td>
									{opts.map((wp,j) => (
									<tr key={wp+"-"+(i+j+1)}>
										<td>{wp}</td>
										{rows.map((row,k) => (

											<td key={k}>
												{row[j]}
											</td>

											))}
									</tr>
									))}
							</tr>

						))}
				</tbody>
			</Table>
			<SilvoGraph {...props} />
			<SilvoBar {...props} />
		</>

)


}
export default Calculator;