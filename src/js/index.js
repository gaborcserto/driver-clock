// Get current date
var today = new Date();
var day = today.getDate();
/*if (day < 10) {
  day = '0' + day
}*/
const out = document.querySelector(".date");
out.innerHTML = day;

setInterval(() => {
	getTime();
}, 50);

const getTime = () => {
	let d = new Date(),
		s = d.getSeconds() + (d.getMilliseconds() / 1000),
		m = d.getMinutes(),
		h = hour12();

	document.querySelector(".hand-sec").style.transform = `rotateZ(${s * 6}deg)`;
	document.querySelector(".hand-min").style.transform = `rotateZ(${m * 6}deg)`;
	document.querySelector(".hand-hour").style.transform = `rotateZ(${(h * 30) + (m * 0.5)}deg)`;

	function hour12() {
		let hour = d.getHours();
		if(hour >= 12) {
			hour = hour-12;
		}

		if(hour === 0) h = 12;

		return hour;
	}
}
