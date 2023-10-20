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
import { NgxTreeFlowModule } from 'ngx-tree-flow.module';

@NgModule({
  declarations: [App],
  bootstrap: [App],
  imports: [NgxTreeFlowModule],
})
export class AppModule {}
```
# Example
* Generic example of some possible output
<img src="https://github.com/domi92/ngx-tree-flow/assets/10332144/d5189481-5454-43c6-a6e3-78caa44ed692" width=65%/>

