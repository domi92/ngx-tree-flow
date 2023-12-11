# ngx-tree-flow
* This Angular component allows to create svg images of a schematic tree workflow. Each step is displayed as a node with a name and a state.
* With node state is possible to automatically change colors of schema and return to the user visual information of current step processed or in error state.
* Component allows to identify nodes by number or by single char name and display multiple nodes on the same level.
* Oter customization are possible and described below

# Installation
Install from npm:

npm i ngx-tree-flow --save .

import NgxTreeFlowModule in your app.module.ts:
```typescript
import { NgxTreeFlowModule } from 'ngx-tree-flow';

@NgModule({
  declarations: [App],
  bootstrap: [App],
  imports: [NgxTreeFlowModule],
})
export class AppModule {}
```
# Example
* Generic example of some possible output results
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/d5189481-5454-43c6-a6e3-78caa44ed692" width=65%/>

# Usage
* import into your component
```typescript
import { TreeFlowNode, TreeFlowNodeState } from 'ngx-tree-flow';
```
- TreeFlowNode: is the basic node object
- TreeFlowNodeState: is used to change state of single node. When status change colors are applied to make state visible
* SINGLE NODE CREATION
```typescript
@Component({
 template: `
    <div style="height: 48vh; width: 48vw; background-color: rgb(172, 222, 255); max-width: 620px">
    <ngx-tree-flow [rotation]="0" [data]="singleData" [useLabels]="false"></ngx-tree-flow>
  </div>
  `,
})
export class AppComponent implements OnInit {
  protected singleData: TreeFlowNode[] = [];

  ngOnInit(): void {
    this.singleData.push({
      id: 1,
      label: 'Start',
      state: TreeFlowNodeState.default,
    });
  }
}
```
Labels are dispalyed only when displayed tree is linear (simple data array is used)

<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/b4b0e4f4-d185-46da-a555-c89a7570d19e" width=20%/>

*  **@Input('hideLinearModelLabel')** use [hideLinearModelLabel]="true" to hide text label
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/52f499be-eb5d-4632-b8eb-1d2b34102e54" width=20%/>

* **@Input('useLabels')** [useLabels]="true" display label inside node
* **@Input('nodeRadius')** can be used to increase node radius dimension (default 14)
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/6554d00f-9c07-4868-8b84-eed3c9333a42" width=20%/>

# Rotation

* **@Input('rotation')** [rotation]="90". Insert degree to rotate image. 90 flip horizontally. Any other degree can be used (75 in  third image exampe). Rotation can be used to animate diagram
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/7527f093-6b73-42ba-b4bc-bbb71807aded" width=30%/>
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/00877e18-4985-487d-9694-a4345f395126" width=30%/>
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/82aba907-40f9-46cc-a754-f4ce66a9864e" width=30%/>

# Customize color states
States are defined as follow
```typescript
export declare enum TreeFlowNodeState {
    default = 0,
    disabled = 1,
    enabled = 2,
    active = 3,
    completed = 4,
    error = 5
}
```

* **@Input('disableAutoLineColor')** [disableAutoLineColor]="true". Can be used to force schema lines not to change color based on nex node state.

* style colors:

  default colors are defined in variables that can be overriden in local component's style 

```css
  /*error*/
  --ngx-tree-flow-fill-color-node-error: grey !important;
  --ngx-tree-flow-stroke-color-node-error: red !important;
  --ngx-tree-flow-text-color-error: darkred !important;
```

<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/e9c5d41b-6948-4e8c-8788-8a84b5555796" width=40%/>

* Complete list of variables that can be customized:
  
```css
   --ngx-tree-flow-background: #121212;
   // default => default style is equal to disabled
   --ngx-tree-flow-fill-color-node-default: var(--ngx-tree-flow-background);
   --ngx-tree-flow-stroke-color-node-default: #CBCBCB;
   --ngx-tree-flow-text-color-default: #CBCBCB;
   /*disabled*/
   --ngx-tree-flow-fill-color-node-disabled: var(--ngx-tree-flow-background);
   --ngx-tree-flow-stroke-color-node-disabled: #CBCBCB;
   --ngx-tree-flow-text-color-disabled: #CBCBCB;
   /*enabled*/
   --ngx-tree-flow-fill-color-node-enabled: var(--ngx-tree-flow-background);
   --ngx-tree-flow-stroke-color-node-enabled: white;
   --ngx-tree-flow-text-color-enabled: white;
   /*active*/
   --ngx-tree-flow-fill-color-node-active: white;
   --ngx-tree-flow-stroke-color-node-active: white;
   --ngx-tree-flow-text-color-active: var(--ngx-tree-flow-background);
   /*completed*/
   --ngx-tree-flow-fill-color-node-completed: #797979;
   --ngx-tree-flow-stroke-color-node-completed: #797979;
   --ngx-tree-flow-text-color-completed: var(--ngx-tree-flow-background);
   /*error*/
   --ngx-tree-flow-fill-color-node-error: #B22F00;
   --ngx-tree-flow-stroke-color-node-error: #D73B04;
   --ngx-tree-flow-text-color-error: white;
   /*others*/
   --ngx-tree-flow-text-font-size: 0.9rem;
   --ngx-tree-flow-line-color: darkgray;
```


# Tree view. Multiple nodes at same level (data is array of arrays)
Change data type to and array of arrays. First array is the level and internal one defines nodes for each level
```typescript
@Component({
  selector: 'app-root',
  //   templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <div style="height: 48vh; width: 48vw; background-color: rgb(172, 222, 255); max-width: 620px">
      <ngx-tree-flow [useStartingJoinNode]="false" [rotation]="0" [data]="data" [hideLinearModelLabel]="true" [nodeRadius]="16"></ngx-tree-flow>
    </div>
  `,
})
export class AppComponent implements OnInit {
  protected data: TreeFlowNode[][] = [];
  ngOnInit(): void {
    this.data.push([
      { id: 0, label: 'A1', state: TreeFlowNodeState.completed },
      { id: 0, label: 'A2', state: TreeFlowNodeState.completed },
    ]);

    this.data.push([
      { id: 1, label: 'B', state: TreeFlowNodeState.completed },
      { id: 2, label: 'C', state: TreeFlowNodeState.completed },
      { id: 3, label: 'D', state: TreeFlowNodeState.completed },
    ]);
    this.data.push([
      { id: 4, label: 'End', state: TreeFlowNodeState.completed },
      { id: 5, label: 'End', state: TreeFlowNodeState.active },
    ]);
  }
}
```
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/656ef06e-6a22-4bd5-b656-d23387487d43" width=30%/>
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/304719ed-6aed-4625-9eaa-522ceab72887" width=30%/>
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/6793eb4c-6952-45a0-b27b-3f7ee32504eb" width=30%/>

* Hide start and ending joining nodes
* **@Input('useStartingJoinNode')** and **@Input('useEndingJoinNode')**

# Dimension and sizes svg elements

Default behavior is to not fit svg to parent container. This allows to use a scroll view in parent and scroll the tree if is bigger than parent

<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/bc426c2b-df30-42cb-8372-2bc925143fa7" width=30%/>

*   **@Input('fitParent')**  set it to true to auto fit svg to parent container. Note that if svg is too big all nodes will be scaled and shrinked down.
*   **@Input('scrollOnActive')** : boolean = false When a scroll view is active is possible to enable an auto scroll function to active node. This wil autmoatically scroll when a node status get to active state in order to center the scroll view to that node

<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/bcbfa43e-c563-4e69-bfde-00581ab9c254" width=30%/>

*   **@Input('horizontalAlign')** : 'start' | 'center' | 'end' = 'center'  change this input to horizontal align component into parent


*   **@Input('levelSpacing')** distance between levels, can be used to increase vertical space and adjust aspect when also node radius is changed to make nodes bigger (Default dimension is 65)
*   **@Input('nodeRadius')** **@Input('nodeStrokeWidth')**  Cusotmize node radius and border dimension (Default dimension are 14 and 2)
  
*   **@Input('nodeJoinRadius')** **@Input('nodeJoinStrokeWidth')**  Node radius and border dimension for joining node between layers with multiple nodes (Default dimension are 8 and 2)

* **@Input('lineStrokeWidth')** Line width connecting nodes (Default dimension is 2)

  
```typescript
 <ngx-tree-flow
        [useStartingJoinNode]="false"
        [useEndingJoinNode]="false"
        [rotation]="0"
        [data]="data"
        [hideLinearModelLabel]="true"
        [nodeRadius]="16"
        [nodeStrokeWidth]="5"
        [nodeJoinRadius]="10"
        [nodeJoinStrokeWidth]="4"
        [lineStrokeWidth]="4"
        [levelSpacing]="110"
      ></ngx-tree-flow>
```
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/3b29f2d6-00a4-4326-b9dd-8669f9c3a23f" width=30%/>

# Height and width component
Component is based on SVG. It is using a viewbox that can be customized with **@Input('viewboxWidth')** (default 500) and **@Input('viewboxHeight')** (default adapted dynamically)

Increasing the size of viewbox, without change node radius will generate a diagram with smaller dimensions. On the other side decreasing viewobx will lead to bigger node dimensions but also to face disaplying error (node displayed outside the visible part of component)

* Svg size is automatically adjusted to container size by deafult. That means we need to fix dimensions for parents or we can use 2 other input property

  **@Input('maxWidth')** and **Input('minWidth')**

If dimension are fixed in this way, svg is adapted to this dimension and will stay fixed also when window dimensions change- Like this tree dimension will stay uniform and are not based on parend dimension

```typescript
<div style="display: flex; justify-content: space-evenly">
   <div style="height: 48vh; width: 33%; background-color: rgb(73, 73, 73)">
    <ngx-tree-flow
      maxWidth="300px"
      minWidth="300px"
      [data]="data"
      [levelSpacing]="80"
      [useEndingJoinNode]="false"
    ></ngx-tree-flow>
  </div>
  <div style="height: 48vh; width: 50%; background-color: rgb(60, 60, 120)">
    <ngx-tree-flow
      maxWidth="300px"
      minWidth="300px"
      [rotation]="0"
      [data]="linearData"
      [levelSpacing]="60"
      [useEndingJoinNode]="false"
    ></ngx-tree-flow>
  </div>
  <div style="height: 48vh; width: auto; background-color: rgb(73, 73, 73)">
    <ngx-tree-flow
      [rotation]="0"
      [data]="singleData"
      [levelSpacing]="60"
      [useEndingJoinNode]="false"
    ></ngx-tree-flow>
  </div>
</div>
```
Last one has not defined any dimension for the parent then with is stretched to fill parent (nodes are bigger). If screen size is reduced and parent width is smaller node can be displayed so smalller to be not visible

<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/4cfc313f-50ea-49e4-ad0d-6a9c4309b3fb" width=80%/>
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/368cad4f-994f-4818-874a-edba173b4910" width=45%/>

To prevent this auto adjust dimension all parent component should have same dimensions plus we can use the **minWidth="300px"** property to ensure all component in the same page will be displayed equally
 
