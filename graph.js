class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    let verticesToCheck = [v1, v2]
    if(verticesToCheck.every(vertex => this.nodes.has(vertex))){
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    } else {
      return undefined;
    }
    
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    let verticesToCheck = [v1, v2];

    if(verticesToCheck.every(vertex => this.nodes.has(vertex))){
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    } else {
      return undefined;
    }
    
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for(let adjacentVertex of vertex.adjacent){
      adjacentVertex.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set();
    seen.add(start);
  
    while (toVisitStack.length) {
      let visitedNode = toVisitStack.pop();
  
      for (let node of visitedNode.adjacent) {
        if (!seen.has(node)) {
          toVisitStack.push(node);
          seen.add(node);
        }
      }
    }
  
    let seenValues = Array.from(seen).map(node => node.value);
    console.log(seenValues);
    return seenValues;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while(toVisitQueue.length){
      let visitedNode = toVisitQueue.shift();
      for(let node of visitedNode.adjacent){
        if(!seen.has(node)){
          toVisitQueue.push(node);
          seen.add(node);
        }
      }
    }
    let array = []
    for(let node of seen){
      array.push(node.value)
    }

    return array;
  }

  shortestPath(start, target){
    let toVisitQueue = [start]
    let seen = new Set(toVisitQueue);
    let parentMap = new Map()
    let returnArray = []
    const addParent = (node) => {
      const parentNode = parentMap.get(node)
      returnArray.unshift(parentNode)
      if(parentNode === start) return
      addParent(parentNode)
    }


    while(toVisitQueue.length){
      
      let visitedNode = toVisitQueue.shift();
      
      if(visitedNode === target){
        returnArray.unshift(target)
        addParent(visitedNode);
        return returnArray;
      }
      
      for(let node of visitedNode.adjacent){
        if(!seen.has(node)){
          parentMap.set(node, visitedNode)
          toVisitQueue.push(node);
          seen.add(node);
        }
      }
    }

    return undefined;

  }

}


module.exports = {Graph, Node}