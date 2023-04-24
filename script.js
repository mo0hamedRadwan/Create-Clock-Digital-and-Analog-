function clock(){
    // Select Clock Hands {Hour , Min , sec}
    const hourHand = document.querySelector('#hour');
    const minHand = document.querySelector('#min');
    const secHand = document.querySelector('#sec');

    // Set Array Of Month, Week Days and ids 
    const months = ["January", "February" , "March" , "April" , "May", "June" , "July" , "Augest" , "September", "October" , "November" , "December"];
    const week = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thueday" , "Friday" , "Saturday"];
    const ids = ["dateName" , "month" , "dayNum" , "year" , "hours" , "minutes" , "seconds" , "period"];

    function updateClock(){
        const currentDate = new Date();
        let dayName = currentDate.getDay();
        let dayNum = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();
        let period = "AM";

        if(hour == 0){
            hour = 12;
        }

        if(hour > 12){
            hour -= 12;
            period = "PM";
        }
        // Add Leading Zero To Repesent Number
        Number.prototype.pad = function(digits){
            let n = this.toString();
            if(n.length < digits){
                n = 0 + n
            }
            return n;
        }
        // Set Value To Conneted Between Ids and Values in One Loop
        const values =[week[dayName], months[month], dayNum.pad(2), year, hour.pad(2), min.pad(2), sec.pad(2), period];
        // console.log(`${dayName} ${dayNum} ${month} ${year} ${hour} ${min} ${sec}`);

        function setAnalogClock(){
            const secRatio = sec / 60;
            const minRatio = (secRatio + min) / 60;
            const hourRatio = (minRatio + hour) / 12;
            setRotation(hourHand , hourRatio);
            setRotation(minHand , minRatio);
            setRotation(secHand , secRatio);
        }

        function setDigitalClock(){
            for(let i = 0 ; i < ids.length ; i++){
                document.getElementById(ids[i]).innerHTML = values[i];
                // document.getElementById(ids[i]).firstChild.nodeValue = values[i];
            }
        }

        function setRotation(element , rotationRatio){
            element.style.setProperty("--handRotaion" , rotationRatio * 360);
        }

        setAnalogClock();
        setDigitalClock();
    }

    setInterval(updateClock , 1000);
    updateClock(); // When Refresh Page not Waiting
}

clock();