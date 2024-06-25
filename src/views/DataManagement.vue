<script setup>
import {h, ref} from 'vue';
import {
  NInputGroup, NSelect, NInput, NButton,
  NDataTable, NTag, NModal, NForm,
  NFormItem, NInputNumber, NDynamicInput,
} from 'naive-ui';
import {format} from "date-fns/esm";
import PersonnelInformationEditingModal from "@/components/PersonnelInformationEditingModal.vue";

const typeOptions = [
  {label: '姓名', value: 'name'},
  {label: '身份号', value: 'identity-number'},
  {label: '家庭号', value: 'family-number'},
]
const queryForm = ref({
  type: 'name',
  value: '',
})
const showEditingModal = ref(false)
const editingForm = ref({
  identityNumber: -1,
  name: '',
  familyNumber: 0,
  inParkTime: [],
  tags: [],
})

const renderInParkTimeTagList = (inParkTime) => {
  return inParkTime.map(([start, end]) => {
    return h(
        NTag,
        {
          size: "small",
          style: "margin-right: 5px"
        },
        {
          default: () => `${format(new Date(start), "yyyy-MM-dd")}~${format(new Date(end), "yyyy-MM-dd")}`
        }
    );
  });
};

const renderTags = (tags) => {
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

const data = [
  {
    identityNumber: 3,
    name: "张三",
    familyNumber: 5,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
  {
    identityNumber: 4,
    name: "李四",
    familyNumber: 6,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
  {
    identityNumber: 5,
    name: "王五",
    familyNumber: 7,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
  {
    identityNumber: 6,
    name: "赵六",
    familyNumber: 8,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
  {
    identityNumber: 7,
    name: "孙七",
    familyNumber: 9,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: [],
  },
  {
    identityNumber: 8,
    name: "周八",
    familyNumber: 10,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: [],
  },
  {
    identityNumber: 9,
    name: "吴九",
    familyNumber: 11,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
  {
    identityNumber: 10,
    name: "郑十",
    familyNumber: 12,
    inParkTime: [[1601481600000, 1712160000000], [1712419200000, 1718467200000]],
    tags: ["种植户"],
  },
];
const columns = createColumns();
const pagination = false

const onAddNewPersonnel = () => {
  editingForm.value = {
    identityNumber: -1,
    name: '',
    familyNumber: 0,
    inParkTime: [],
    tags: [],
  }
  showEditingModal.value = true
}
const onEditPersonnel = (row) => {
  editingForm.value = row
  showEditingModal.value = true
}
const onCloseEditingModal = (newValue) => {
  showEditingModal.value = false
  if (newValue) {
    console.log(newValue)
  }
}
</script>

<template>
  <div class="container">
    <div class="input-container">
      <n-input-group>
        <n-select style="width: 10em" :options="typeOptions" v-model:value="queryForm.type"/>
        <n-input v-model:value="queryForm.value"/>
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <n-button type="info" @click="onAddNewPersonnel">新增</n-button>
    </div>

    <div class="data-container">
      <n-data-table
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :bordered="false"
      />
    </div>

    <personnel-information-editing-modal
        :show-editing-modal="showEditingModal"
        :editing-form="editingForm"
        @close-modal="onCloseEditingModal"
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