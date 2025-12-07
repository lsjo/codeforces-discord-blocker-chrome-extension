async function selectProblems(url, ranges) {
    const resp = await fetch(url);
    const json_data = await resp.json();    
    const problems = json_data.result.problems;

    const selected_problems = [];

    for (var i = 0; i < ranges.length; i++) {
        const arr = [];
        for (var j = 0; j < problems.length; j++) {
            const problem = problems[j];
            if ("rating" in problem && ranges[i][0] <= problem["rating"] && problem["rating"] <= ranges[i][1]) {
                arr.push(problem);
            }
        }
        const index = Math.floor(Math.random()*arr.length);
        selected_problems.push(arr[index]);
    }

    return selected_problems;
}

async function checkSolved(username, problems, num=10) {
    const link = new URL(`https://codeforces.com/api/user.status?handle=${username}&count=${num}`);
    const resp = await fetch(link);
    const data = await resp.json();

    if (data.status=="FAILED") {
        console.log("failed to get data");
        return false;
    }

    for (var i=0; i < num; i++) {
        const submission = data.result[i];
        if (submission.verdict=='OK') {
            for (var j = 0; j < problems.length; j++) {
                if (submission.problem.contestId==problems[j].contestId && 
                    submission.problem.index==problems[j].index) {
                        console.log(`solved problem ${j}`);
                        return true;
                    }
            }
        }
    }

    console.log("hasn't solved a problem");

    return false;
}

var tasks;

function buttonClick() {
    console.log("button has been clicked");
    const username = document.getElementById("username").value;
    const solved = checkSolved(username, tasks);
    solved
        .then((pos) => {
            if (pos) {
                const maindiv = document.getElementById("main-div");
                maindiv.remove();
            }
        });
}



const u = new URL("https://codeforces.com/api/problemset.problems");

var div = document.createElement("div");
div.id = "main-div";
div.innerHTML = "<h1>Solve a problem, type in your username, and click submit to unlock discord</h1><br>";
div.style.cssText = "height: 100%; width: 100%; position: absolute; z-index:100000; background-color: white; padding: 10px;";
const currentDiv = document.getElementById("app-mount");

const baseURL = "https://codeforces.com/problemset/problem/"

const problems = selectProblems(u, [[800,1200],[1300,1900],[2000,2600]]);
problems
    .then((data) => {
        tasks = data;
        div.innerHTML += "<ul>"
        for (var i = 0; i < data.length; i++) {
            const problem = data[i];
            var newdiv = document.createElement("div");
            newdiv.innerHTML = `<li><a href='${baseURL}/${problem.contestId}/${problem.index}' target='_blank'>${problem.name} - rating: ${problem.rating}</a></li>`;
            div.innerHTML += newdiv.innerHTML;
        }
        div.innerHTML += "</ul>";
        div.innerHTML += "<p>Username here</p>";
        div.innerHTML += "<input name='username' type='text' id='username'>";
        div.innerHTML += "<button id='button1' onClick='buttonClick()'>submit</button>";
        document.body.insertBefore(div, currentDiv);

        const button = document.getElementById("button1");
        button.addEventListener("click", buttonClick);

    })
    .catch((error) => {
        console.log("failed");
    });
