<template>
  <div>
    <div>
      <el-button class="add-button" @click="showCreate" type="primary">
        新增
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="分配名称">
        </el-table-column>
        <el-table-column align="center" prop="level" label="级别">
        </el-table-column>
        <el-table-column align="center" prop="productCount" label="商品数量">
        </el-table-column>
        <el-table-column align="center" prop="productUnit" label="数量单位">
        </el-table-column>
        <el-table-column align="center" label="导航栏">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.navStatus"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="showStatus" label="是否显示">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.showStatus"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序">
        </el-table-column>
        <el-table-column align="center" label="设置" width="250px">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="nextPage(scope.row.id)" :disabled="scope.row.level!=1"> 查看下级 </el-button>
              <el-button> 转移商品 </el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作">
          <el-row>
            <el-button class="check-button"> 编辑 </el-button>
            <el-button class="check-button" type="danger"> 删除 </el-button>
          </el-row>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin: auto 0; text-align: center">
      <el-pagination
        class="page"
        :page-size="queryForm.limit"
        background
        layout="prev, pager, next"
        :total="dataTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProductCategory } from "@/api/product";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "商品名称",
          level: 1,
          productCount: 1,
          productUnit: "元",
          navStatus: true,
          showStatus: true,
          sort: 1,
        },
      ],
      queryForm: {
        current: 1,
        limit: 10,
      },
      dataTotal: 20,
    };
  },
  methods: {
    nextPage(id) {
      this.$router.push("?id=" + id);
    },
    showCreate(){
      this.$router.push('./category/form')
    },
    getProducrCategryList() {
      this.queryForm.id = this.$route.query.id ? this.$route.query.id : 0;
      getProductCategory(this.queryForm).then((response) => {
        this.dataTotal = response.data.total;
        this.tableData = response.data.records;
      });
    },
  },
  mounted() {
    this.getProducrCategryList();
  },
  watch: {
    $route(to, from) {
      this.getProducrCategryList();
    },
  },
};
</script>

<style scoped>
.table {
  margin: 40px;
}
.check-button {
  width: 60px;
  font-size: 5px;
  text-align: center;
  padding-right: 5px;
  padding-left: 6px;
}
.add-button {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  margin-bottom: 20px;
}
</style>