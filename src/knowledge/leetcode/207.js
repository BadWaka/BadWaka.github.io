
/**
 * @returns
 */
function f(numCourses, prerequisites) {

    console.log('numCourses', numCourses, 'prerequisites', prerequisites);

    if (prerequisites.length === 0) {
        return true;
    }

    // 有依赖的课程列表
    let relyList = [];
    // 不依赖的课程列表
    let noRelyList = [];
    // 依赖映射表
    const relyMap = {};
    prerequisites.forEach(item => {
        item.forEach((course, courseIndex) => {
            // 依赖关系放入 map 里
            if (courseIndex - 1 >= 0) {
                if (relyMap[item[courseIndex - 1]] === undefined) {
                    relyMap[item[courseIndex - 1]] = [];
                }
                relyMap[item[courseIndex - 1]].push(course);
            }
            if (courseIndex < item.length - 1 && relyList.indexOf(course) === -1) {
                relyList.push(course);
                // 如果不依赖的课程列表也有，移除
                // const noIndex = noRelyList.indexOf(course);
                // if (noIndex !== -1) {
                //     noRelyList.splice(noIndex, 1);
                // }
            }
            // else if (
            //     courseIndex === item.length - 1
            //     && relyList.indexOf(course) === -1
            // ) {
            //     noRelyList.push(course);
            // }
        });
    });

    for (let i = 0; i < numCourses; i++) {
        if (relyMap[i] === undefined && noRelyList.indexOf(i) === -1) {
            noRelyList.push(i);
        }
    }

    relyList = relyList.sort((a, b) => a - b);

    console.log('relyMap', relyMap);
    console.log('relyList', relyList);
    console.log('noRelyList', noRelyList);

    // 没入口了，直接 false
    if (noRelyList.length === 0) {
        return false;
    }

    // 不依赖的大于需要课程数，那全上不依赖的就行
    if (noRelyList.length >= numCourses) {
        return true;
    }

    // 要上的课
    let courseList = [];

    // 先上不依赖的
    noRelyList.forEach(course => {
        courseList.push(course);
    });

    // 再上依赖的
    relyList.forEach(course => {
        // 前置课是否已经上过了
        const index = courseList.indexOf(relyMap[course]);
        if (index !== -1) {
            courseList.push(course);
        }
    });

    console.log('courseList', courseList);

    if (courseList.length >= numCourses) {
        return true;
    }

    return false;
}

let numCourses = 2;
numCourses = 1;
numCourses = 3;
let prerequisites = [[1,0]];
// prerequisites = [[1,0], [0,1]];
// prerequisites = [];
prerequisites = [[2,1],[1,0]];
prerequisites = [[0,2],[1,2],[2,0]];
prerequisites = [[1,0],[1,2],[0,1]];
prerequisites = [[0,1],[0,2],[1,0]];
const res = f(numCourses, prerequisites);
console.log('\nres', res);
