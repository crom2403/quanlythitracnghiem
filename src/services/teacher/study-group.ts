import instance from "../instance"
import routes from "../routes"

export const apiGetStudyGroup = (params: any) => {
  return instance.get(`${routes.teacher.study_group}/${params}`)
}

export const apiGetStudyGroupDetail = (studyGroupId: number) => {
  return instance.get(`${routes.teacher.study_group_detail}/${studyGroupId}`)
}
