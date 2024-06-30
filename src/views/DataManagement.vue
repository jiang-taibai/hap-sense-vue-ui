<script setup>
import {h, onMounted, ref} from 'vue';
import {
  NInputGroup, NSelect, NInput, NButton,
  NDataTable, NTag,
} from 'naive-ui';
import PersonnelInformationEditingModal from "@/components/PersonnelInformationEditingModal.vue";
import {queryResidents} from "@/assets/js/api/java-api.js";
import {ConvertResidentInformation} from "@/assets/js/utils.js";
import {useStatisticsStore} from "@/stores/statistics-state.js";

const typeOptions = [
  {label: '姓名', value: 'name'},
  {label: '身份号', value: 'identity_number'},
  {label: '家庭号', value: 'family_number'},
]
const queryForm = ref({
  type: 'name',
  value: '',
})
const showEditingModal = ref(false)
const editingForm = ref({
  id: '',
  identityNumber: -1,
  name: '',
  familyNumber: 0,
  inParkTime: [],
  tags: [],
})
const statisticsStore = useStatisticsStore()

const renderInParkTimeTagList = (inParkTime) => {
  return inParkTime.map(([start, end]) => {
    return h(
        NTag,
        {
          size: "small",
          style: "margin-right: 5px"
        },
        {
          default: () => `${start}~${end}`
        }
    );
  });
};

const renderTags = (tags) => {
  if (tags.length === 0) {
    return "-";
  }
  return tags.map(tag => {
    return h(
        NTag,
        {
          size: "small",
          style: "margin-right: 5px"
        },
        {
          default: () => tag
        }
    );
  });
};

const createColumns = () => {
  return [
    {
      title: "身份号",
      key: "identityNumber"
    },
    {
      title: "姓名",
      key: "name"
    },
    {
      title: "家庭号",
      key: "familyNumber"
    },
    {
      title: "在园区间",
      key: "inParkTime",
      render: row => renderInParkTimeTagList(row.inParkTime),
    },
    {
      title: "标签",
      key: "tags",
      render: row => renderTags(row.tags)
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => onEditPersonnel(row)
            },
            {default: () => "编辑"}
        );
      }
    }
  ];
};

const data = ref([
  // {
  //   identityNumber: 3,
  //   name: "张三",
  //   familyNumber: 5,
  //   inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
  //   tags: ["种植户"],
  // },
]);
const columns = createColumns();

const onAddNewPersonnel = () => {
  editingForm.value = {
    identityNumber: '',
    name: '',
    familyNumber: 0,
    inParkTime: [],
    tags: [],
  }
  showEditingModal.value = true
}
const onEditPersonnel = (row) => {
  editingForm.value = ConvertResidentInformation.TableToEditForm(JSON.parse(JSON.stringify(row)))
  showEditingModal.value = true
}
const onCloseEditingModal = (newValue) => {
  showEditingModal.value = false
  if (newValue) {
    console.log(newValue)
  }
}

const pagination = ref({
  page: 1,
  pageCount: 1,
  pageSize: 50,
  prefix({itemCount}) {
    return `Total is ${itemCount}.`
  }
})
const rowKey = (rowData) => {
  return rowData.column1
}
const handlePageChange = (page) => {
  loadResidents(page)
}
const loadResidents = (page) => {
  queryResidents(
      queryForm.value.type,
      queryForm.value.value,
      page,
      pagination.value.pageSize, (response) => {
        const responseData = response.data
        pagination.value.page = responseData.data.pageNum
        pagination.value.pageCount = responseData.data.pages
        const items = responseData.data.list
        data.value = items.map(item => ConvertResidentInformation.APIToTable(item))
      })
}
const onSearch = () => {
  handlePageChange(1)
}
onMounted(() => {
  handlePageChange(1)
})
const onUpdateResident = (resident) => {
  handlePageChange(pagination.value.page)
}
</script>

<template>
  <div class="container">
    <div class="input-container">
      <n-input-group>
        <n-select style="width: 10em" :options="typeOptions" v-model:value="queryForm.type"/>
        <n-input v-model:value="queryForm.value" clearable placeholder="请输入关键词"/>
        <n-button type="primary" @click="onSearch">搜索</n-button>
      </n-input-group>
      <n-button type="info" @click="onAddNewPersonnel">新增</n-button>
    </div>

    <div class="data-container">
      <n-data-table
          remote
          :columns="columns"
          :data="data"
          :row-key="rowKey"
          :pagination="pagination"
          :bordered="false"
          @update:page="handlePageChange"
      />
    </div>

    <personnel-information-editing-modal
        :show-editing-modal="showEditingModal"
        :editing-form="editingForm"
        @close-modal="onCloseEditingModal"
        @update-resident="onUpdateResident"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;

  .input-container {
    max-width: 800px;
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
}
</style>