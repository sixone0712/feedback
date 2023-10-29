import CategoryCreateRequest from "./CategoryCreateRequest";

interface CategoryUpdateRequest extends CategoryCreateRequest {
    entityId: string;
}

export default CategoryUpdateRequest;
