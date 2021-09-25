<template>
  <div class="save-form">
    <el-form
      :model="productCategory"
      :rules="rules"
      ref="productCategory"
      label-width="100px"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="productCategory.name"></el-input>
      </el-form-item>
      <el-form-item label="上级目录" prop="parentId">
        <el-select
          v-model="productCategory.parentId"
          placeholder="请选择活动区域"
        >
          <el-option label="无上级分类" value="0"></el-option>
          <el-option label="区域二" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位" required>
        <el-input v-model="productCategory.productUnit"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="productCategory.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="showStatus">
        <el-radio v-model="productCategory.showStatus" label="true"
          >展示</el-radio
        >
        <el-radio v-model="productCategory.showStatus" label="false"
          >不展示</el-radio
        >
      </el-form-item>
      <el-form-item label="是否显示在导航栏" prop="navStatus">
        <el-radio v-model="productCategory.navStatus" label="true"
          >展示</el-radio
        >
        <el-radio v-model="productCategory.navStatus" label="false"
          >不展示</el-radio
        >
      </el-form-item>
      <el-form-item label="分类图标" prop="icon">
        <el-input v-model="productCategory.icon"></el-input>
      </el-form-item>
      <!-- <el-form-item label="筛选属性" prop="desc">
        <el-input v-model="productCategory.desc"></el-input>
      </el-form-item> -->
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="productCategory.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input
          type="textarea"
          v-model="productCategory.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productCategory')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('productCategory')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {saveProductCategory} from '@/api/product'
export default {
  data() {
    return {
      productCategory: {},
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  methods: {
      submitForm(){
          saveProductCategory(this.productCategory)
          .then(response=>{
            this.$router.push('/product/category')
          })

      }
  },
};
</script>

<style>
.save-form {
  width: 800px;
  padding-top: 100px;
  margin: 0 auto;
}
</style>