<template>
  <div class="list">
    <div class="search"></div>
    <div>
      <el-button class="add-button" @click="showCreate" type="primary">
        新增
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" align="center" label="编号">
        </el-table-column>
        <el-table-column prop="name" align="center" label="权限名称">
        </el-table-column>
        <el-table-column prop="uri" align="center" label="权限路径">
        </el-table-column>
        <el-table-column prop="categoryName" align="center" label="权限分组">
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-link class="operation-link" @click="update(row)" type="primary"
              >编辑</el-link
            >
            <el-popconfirm
              title="确定要删除吗?"
              @onConfirm="handlerConfirm(row.id)"
            >
              <el-link class="operation-link" type="danger" slot="reference"
                >删除</el-link
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增/编辑" :visible.sync="dialogFormVisible">
        <el-form
          ref="form"
          :model="permissionForm"
          :rules="rules"
          label-width="80px"
          class="form"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input
              class="form-input"
              v-model="permissionForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限路径" prop="uri">
            <el-input
              class="form-input"
              v-model="permissionForm.uri"
            ></el-input>
          </el-form-item>

          <el-form-item label="权限类别" prop="categoryId">
            <el-select
              v-model="permissionForm.categoryId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              type="textarea"
              class="form-input"
              v-model="permissionForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">{{
              permissionForm.id ? "立即修改" : "立即创建"
            }}</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div style="text-align: center; padding-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :page-size="limit"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  queryPermissionList,
  queryPermissionCategoryList,
  savePermission,
  updatePermisson,
} from "@/api/permission";
export default {
  data() {
    return {
      loading: false,
      limit: 20,
      total: 0,
      current: 1,
      categoryList: [],
      dialogFormVisible: false,
      permissionForm: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        uri: [{ required: true, message: "请输入地址", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述", trigger: "blur" }],
        categoryId: [{ required: true, message: "请选择权限类别", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  methods: {
    initTable() {
      this.loading = true;
      queryPermissionList({ limit: this.limit, current: this.current }).then(
        (resp) => {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
          this.loading = false;
        }
      );
    },
    showCreate() {
      this.permissionForm = {};

      this.openDialog()
    },
    update(row){
        this.permissionForm=row
        this.openDialog()
    },
    submitForm(formName){
        this.$refs[formName].validate(valid=>{
            if(valid){
                if(this.permissionForm.id){
                     updatePermisson(this.permissionForm).then(resp=>{
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        this.dialogFormVisible=false;
                        this.initTable()
                    })
                }else{
                    savePermission(this.permissionForm).then(resp=>{
                        this.$message({
                            message:'保存成功',
                            type:'success'
                        })
                        this.dialogFormVisible=false;
                        this.initTable()
                    })
                }
            }
        })
    },
    openDialog() {
      this.initCategory();
      this.dialogFormVisible = true;
    },
    initCategory() {
      queryPermissionCategoryList().then((resp) => {
        this.categoryList = resp.data;
      });
    },
    changePage() {},
  },
  mounted() {
    this.initTable();
  },
};
</script>

<style scoped>
.form-input {
  width: 400px;
}
.add-button {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  margin-bottom: 20px;
}
.operation-link {
  margin-left: 5px;
}
</style>