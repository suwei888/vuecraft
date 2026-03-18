<template>
  <el-table :data="apis" style="width: 100%" border stripe>
    <el-table-column prop="name" label="API名称" width="200">
      <template #default="{ row }">
        <code class="api-name">{{ row.name }}</code>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="150">
      <template #default="{ row }">
        <el-tag :type="getTypeTag(row.type)" size="small">{{ row.type }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="params" label="参数">
      <template #default="{ row }">
        <code class="api-params">{{ row.params }}</code>
      </template>
    </el-table-column>
    <el-table-column prop="returns" label="返回值" width="150">
      <template #default="{ row }">
        <code class="api-returns">{{ row.returns }}</code>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="说明">
      <template #default="{ row }">
        <span>{{ row.description }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
export interface ApiItem {
  name: string
  type: 'function' | 'directive' | 'component' | 'option'
  params: string
  returns: string
  description: string
}

defineProps<{
  apis: ApiItem[]
}>()

function getTypeTag(type: string) {
  const map: Record<string, string> = {
    function: 'primary',
    directive: 'warning',
    component: 'success',
    option: 'info'
  }
  return map[type] || 'info'
}
</script>

<style lang="scss" scoped>
.api-name {
  background: #f5f7fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 13px;
  color: #409eff;
}

.api-params,
.api-returns {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  color: #606266;
}
</style>