import CategoryListEntity from '../bases/types/CategoryListEntity';
import CategoryEntity from '../bases/types/CategoryEntity';
import { v4 as uuidv4 } from 'uuid';
import CategoryCreateRequest from '../bases/types/CategoryCreateRequest';
import CategoryUpdateRequest from '../bases/types/CategoryUpdateRequest';
import { waitHalfSecond } from '../bases/utils';

function CategoryProvider() {
  const categories: CategoryEntity[] = [
    {
      entityId: uuidv4(),
      name: '인정 또는 칭찬하기',
      description: '동료에게 인정과 칭찬을 전달하세요.',
      isArchived: false,
    },
    {
      entityId: uuidv4(),
      name: '감사한 마음 전하기',
      description: '감사한 마음을 표현하세요.',
      isArchived: false,
    },
    {
      entityId: uuidv4(),
      name: '다른 말 전하기',
      description: '피드백을 전달해보세요.',
      isArchived: true,
    },
  ];

  async function getCategories(): Promise<CategoryListEntity> {
    return waitHalfSecond(() => JSON.parse(JSON.stringify({ categories })));
  }

  async function createCategory(request: CategoryCreateRequest) {
    // TODO: Implement this
    const { name, description } = request;

    const saveData = {
      entityId: uuidv4(),
      name,
      description,
      isArchived: false,
    };

    categories.push(saveData);

    return waitHalfSecond(() => JSON.parse(JSON.stringify(saveData)));
  }

  async function modifyCategory(request: CategoryUpdateRequest) {
    // TODO: Implement this
    const { entityId, name, description } = request;
    const foundIndex = categories.findIndex(
      ({ entityId: id }) => id == entityId,
    );

    if (foundIndex === -1) {
      return;
    }

    categories[foundIndex] = {
      ...categories[foundIndex],
      name,
      description,
    };

    return waitHalfSecond(() =>
      JSON.parse(JSON.stringify(categories[foundIndex])),
    );
  }

  async function deleteCategory(entityId: string) {
    // TODO: Implement this
    const foundIndex = categories.findIndex(
      ({ entityId: id }) => id == entityId,
    );

    if (foundIndex === -1) {
      return;
    }

    categories[foundIndex] = {
      ...categories[foundIndex],
      isArchived: true,
    };

    return waitHalfSecond(() => JSON.parse(JSON.stringify(entityId)));
  }

  return {
    getCategories,
    createCategory,
    modifyCategory,
    deleteCategory,
  };
}

export default CategoryProvider();
