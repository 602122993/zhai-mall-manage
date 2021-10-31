<template>
  <div>
    <div>
      <draggable  class="draggable" v-model="tableData">
        <transition-group>
          <div class="item" v-for="(item, index) in tableData" :key="item.id">
            {{ defaultCase + index + 1 + "、" + item.name }}
          </div>
        </transition-group>
      </draggable>
    </div>
    <div>
      <el-button style="margin-left: 90%" type="primary" @click="confirm">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    defaultCase: Number,
    dataList: Array,
    submit: Function,
  },
  //   name: "Draggable",
  components: { draggable },
  data() {
    return {
        tableData :this. dataList
    };
  },
  methods: {
    confirm() {
        this.tableData.forEach((table,index)=>{
            table.sort=this.defaultCase+index+1
        })
      this.$emit("confirm", this.tableData);
    },
   
    
  },
  watch: {
    disable(newVal, oldVal) {
      this.dialogVisable = newVal;
    },
    dataList(newVal,oldVal){
        this.tableData = newVal
    }
  },
};
</script>

<style scoped>
.item {
  padding: 6px;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
.draggable {
  width: 500px;
  margin: auto;
}
</style>