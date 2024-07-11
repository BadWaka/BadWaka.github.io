
class Graph {

    adjMap;

    constructor() {
        // 邻接表
        this.adjMap = {};
    }

    // 添加点
    addVertex(v) {
        this.adjMap[v] = [];
    }

    // 添加边
    addEdge(v1, v2) {
        this.adjMap[v1].push(v2);
    }

    // 拓扑排序
    topologicalSort(map) {

        if (!map) {
            map = this.adjMap;
        }
        // console.log('map', map);

        // 入度 Map
        let inDegreeMap = {};
        // 遍历邻接表，统计每个顶点的入度
        Object.keys(map).forEach(vertex => {
            const neighborList = map[vertex];
            // console.log('vertex', vertex, 'neighborList', neighborList);
            inDegreeMap[vertex] = neighborList.length;
        });
        // console.log('inDegreeMap', inDegreeMap);

        // 入度为 0 的队列
        let queueDegree0 = [];
        // 结果数组
        let res = [];

    }

}

let graph = new Graph();
graph.addVertex(3);
graph.addVertex(6);
graph.addEdge(3, 6);
graph.topologicalSort();
