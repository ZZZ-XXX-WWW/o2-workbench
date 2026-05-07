# O2OA API 完整清单

> 数据来源：源码扫描（6155个Java文件），所有 @Path 注解

> 生成时间：2026-04-30


## x_ai_assemble_control

*功能：AI 对话管理*

| 接口路径 | Action 文件 |

|---|---|

| `base/config` | ConfigAction.java |

| `chat` | ChatAction.java |

| `cms/doc/with/app/{appId}` | IndexAction.java |

| `cms/doc/{docId}` | IndexAction.java |

| `completion` | ChatAction.java |

| `config` | ConfigAction.java |

| `create/mcp` | ConfigAction.java |

| `create/model` | ConfigAction.java |

| `delete/mcp/{flag}` | ConfigAction.java |

| `delete/model/{flag}` | ConfigAction.java |

| `delete/{clueId}` | ChatAction.java |

| `delete/{flag}` | FileAction.java, IndexAction.java |

| `file` | FileAction.java |

| `get` | ConfigAction.java |

| `get/mcp/ext/{flag}` | ConfigAction.java |

| `get/mcp/{flag}` | ConfigAction.java |

| `get/model/{flag}` | ConfigAction.java |

| `index` | IndexAction.java |

| `list` | FileAction.java |

| `list/completion/{clueId}/paging/{page}/size/{size}` | ChatAction.java |

| `list/mcp/paging/{page}/size/{size}` | ConfigAction.java |

| `list/model/paging/{page}/size/{size}` | ConfigAction.java |

| `list/paging/{page}/size/{size}` | ChatAction.java, FileAction.java, IndexAction.java |

| `save` | ConfigAction.java |

| `update/mcp/{flag}` | ConfigAction.java |

| `update/model/{flag}` | ConfigAction.java |

| `upload` | FileAction.java |

| `write/completion/extra` | ChatAction.java |

| `{flag}` | FileAction.java |

| `{id}/download` | FileAction.java |



## x_attendance_assemble_control

*功能：考勤管理*

| 接口路径 | Action 文件 |

|---|---|

| `all` | DingdingAttendanceAction.java, QywxAttendanceAction.java |

| `analyse` | AttendanceDetailAction.java |

| `analyse/id/{id}` | AttendanceDetailAction.java |

| `analyse/redo` | AttendanceDetailAction.java |

| `analyse/{startDate}/{endDate}` | AttendanceDetailAction.java |

| `appeal/{id}` | AttendanceAppealInfoAction.java |

| `archive/{id}` | AttendanceAppealInfoAction.java, AttendanceDetailAction.java |

| `attendance/list/{id}/next/{count}` | DingdingAttendanceAction.java, QywxAttendanceAction.java |

| `attendanceadmin` | AttendanceAdminAction.java |

| `attendanceappealInfo` | AttendanceAppealInfoAction.java |

| `attendancedetail` | AttendanceDetailAction.java |

| `attendancedetail/mobile` | AttendanceDetailMobileAction.java |

| `attendanceemployeeconfig` | AttendanceEmployeeConfigAction.java |

| `attendanceimportfileinfo` | AttendanceImportFileInfoAction.java |

| `attendanceschedulesetting` | AttendanceScheduleSettingAction.java |

| `attendanceselfholiday` | AttendanceSelfHolidayAction.java |

| `attendancesetting` | AttendanceSettingAction.java |

| `attendancestatisticalcycle` | AttendanceStatisticalCycleAction.java |

| `attendancestatisticrequirelog` | AttendanceStatisticRequireLogAction.java |

| `attendanceworkdayconfig` | AttendanceWorkDayConfigAction.java |

| `audit` | AttendanceAppealInfoAction.java |

| `check` | MobileAction.java |

| `check ` | AttendanceAppealInfoAction.java |

| `check/ from/out` | MobileAction.java |

| `check/pre` | MobileAction.java |

| `checkDetailWithPersonByCycle/{cycleYear}/{cycleMonth}` | AttendanceDetailAction.java |

| `code/{code}` | AttendanceSettingAction.java |

| `config/group/{groupId}` | GroupScheduleAction.java |

| `controls` | MyAction.java |

| `create` | ShiftAction.java |

| `cycleDetail/{year}/{month}` | AttendanceStatisticalCycleAction.java |

| `delete/people/{people}/date/{date}` | RecordAction.java |

| `delete/{id}` | LeaveAction.java, ShiftAction.java |

| `detail/list` | MyAction.java |

| `dingding` | DingdingAttendanceAction.java |

| `dingdingstatistic` | DingdingAttendanceStatisticAction.java |

| `do` | AttendanceStatisticAction.java |

| `docId/{docId}` | AttendanceSelfHolidaySimpleAction.java |

| `enable/type` | AttendanceSettingAction.java |

| `filter` | AttendanceWorkDayConfigAction.java |

| `filter/list` | AttendanceDetailAction.java |

| `filter/list/page/{page}/count/{count}` | AttendanceDetailMobileAction.java |

| `filter/list/topUnit` | AttendanceDetailAction.java |

| `filter/list/unit` | AttendanceDetailAction.java |

| `filter/list/user` | AttendanceDetailAction.java |

| `filter/list/{id}/next/{count}` | AttendanceAppealInfoAction.java, AttendanceDetailAction.java, AttendanceSelfHolidayAction.java |

| `filter/list/{id}/prev/{count}` | AttendanceAppealInfoAction.java, AttendanceDetailAction.java, AttendanceSelfHolidayAction.java |

| `filter/personMonth/list/{id}/next/{count}` | AttendanceStatisticShowAction.java |

| `filter/personMonth/list/{id}/prev/{count}` | AttendanceStatisticShowAction.java |

| `filter/topUnitDay/list/{id}/next/{count}` | AttendanceStatisticShowAction.java |

| `filter/topUnitDay/list/{id}/prev/{count}` | AttendanceStatisticShowAction.java |

| `filter/topUnitMonth/list/{id}/next/{count}` | AttendanceStatisticShowAction.java |

| `filter/topUnitMonth/list/{id}/prev/{count}` | AttendanceStatisticShowAction.java |

| `filter/unitDay/list/{id}/next/{count}` | AttendanceStatisticShowAction.java |

| `filter/unitDay/list/{id}/prev/{count}` | AttendanceStatisticShowAction.java |

| `filter/unitMonth/list/{id}/next/{count}` | AttendanceStatisticShowAction.java |

| `filter/unitMonth/list/{id}/prev/{count}` | AttendanceStatisticShowAction.java |

| `import` | LeaveAction.java, RecordAction.java |

| `import/daily` | RecordAction.java |

| `import/result/flag/{flag}` | LeaveAction.java |

| `list/all` | AttendanceAdminAction.java, AttendanceEmployeeConfigAction.java, AttendanceImportFileInfoAction.java, AttendanceScheduleSettingAction.java, AttendanceSelfHolidayAction.java, AttendanceSettingAction.java, AttendanceStatisticRequireLogAction.java, AttendanceStatisticalCycleAction.java, AttendanceWorkDayConfigAction.java, AttendanceWorkPlaceAction.java, WorkPlaceV2Action.java |

| `list/filter` | GroupScheduleAction.java |

| `list/group/{groupId}/month/{month}` | GroupScheduleAction.java |

| `list/ids` | WorkPlaceV2Action.java |

| `list/manager/{page}/size/{size}` | AppealInfoAction.java |

| `list/persons/nonesign` | AttendanceDetailAction.java |

| `list/topUnit/{name}` | AttendanceScheduleSettingAction.java |

| `list/unit/{name}` | AttendanceScheduleSettingAction.java |

| `list/{file_id}` | AttendanceDetailAction.java |

| `list/{page}/size/{size}` | AppealInfoAction.java, DetailAction.java, GroupAction.java, LeaveAction.java, RecordAction.java, ShiftAction.java |

| `manager/list/{id}/next/{count}` | AttendanceAppealInfoAction.java |

| `mobilepreview` | AttendanceDetailMobileAction.java |

| `my` | AttendanceDetailMobileAction.java |

| `person` | ConfigAction.java |

| `person/unit/{unit}/{year}/{month}` | DingdingAttendanceStatisticAction.java, QywxAttendanceStatisticAction.java |

| `person/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `person/{person}/date/{date}` | GroupAction.java |

| `person/{person}/{year}/{month}` | DingdingAttendanceStatisticAction.java, QywxAttendanceStatisticAction.java |

| `persons/unit/subnested/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `persons/unit/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `qywx` | QywxAttendanceAction.java |

| `qywxstatistic` | QywxAttendanceStatisticAction.java |

| `random` | UUIDAction.java |

| `rebuild/detail/group/{groupId}/date/{date}` | GroupAction.java |

| `rebuild/person/{person}/date/{date}/` | DetailAction.java |

| `recive` | AttendanceDetailAction.java, AttendanceDetailMobileAction.java |

| `reciveSingle` | AttendanceDetailAction.java |

| `rest/date/check` | MyAction.java |

| `selfholidaysimple` | AttendanceSelfHolidaySimpleAction.java |

| `statistic` | AttendanceStatisticAction.java, MyAction.java |

| `statistic/export/filter` | DetailAction.java |

| `statistic/filter` | DetailAction.java |

| `statistic/person/year/{year}/month/{month}` | DingdingAttendanceAction.java |

| `statistic/unit/year/{year}/month/{month}/day/{day}` | DingdingAttendanceAction.java |

| `statistic/{detailId}/list/record` | DetailAction.java |

| `statisticshow` | AttendanceStatisticShowAction.java |

| `sync/from/{dateFrom}/to/{dateTo}/start` | DingdingAttendanceAction.java, QywxAttendanceAction.java |

| `sync/list` | DingdingAttendanceAction.java, QywxAttendanceAction.java |

| `template` | LeaveAction.java, RecordAction.java |

| `topUnit/day/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `topUnit/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/day/topUnit/{name}/{date}` | AttendanceStatisticShowAction.java |

| `unit/day/{name}/{date}` | AttendanceStatisticShowAction.java |

| `unit/day/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/subnested/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/sum/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/topUnit/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/{name}/{year}/{month}` | AttendanceStatisticShowAction.java |

| `unit/{unit}/{year}/{month}` | DingdingAttendanceStatisticAction.java, QywxAttendanceStatisticAction.java |

| `update` | ShiftAction.java |

| `uuid` | UUIDAction.java |

| `v2/appeal` | AppealInfoAction.java |

| `v2/config` | ConfigAction.java |

| `v2/detail` | DetailAction.java |

| `v2/group` | GroupAction.java |

| `v2/groupschedule` | GroupScheduleAction.java |

| `v2/leave` | LeaveAction.java |

| `v2/mobile` | MobileAction.java |

| `v2/my` | MyAction.java |

| `v2/record` | RecordAction.java |

| `v2/shift` | ShiftAction.java |

| `v2/workplace` | WorkPlaceV2Action.java |

| `version` | MyAction.java |

| `workflow/appeal/{id}` | AttendanceAppealInfoAction.java |

| `workflow/sync` | AttendanceAppealInfoAction.java |

| `workplace` | AttendanceWorkPlaceAction.java |

| `{id}` | AppealInfoAction.java, AttendanceAdminAction.java, AttendanceAppealInfoAction.java, AttendanceDetailAction.java, AttendanceDetailMobileAction.java, AttendanceEmployeeConfigAction.java, AttendanceImportFileInfoAction.java, AttendanceScheduleSettingAction.java, AttendanceSelfHolidayAction.java, AttendanceSettingAction.java, AttendanceStatisticRequireLogAction.java, AttendanceStatisticalCycleAction.java, AttendanceWorkDayConfigAction.java, AttendanceWorkPlaceAction.java, GroupAction.java, RecordAction.java, ShiftAction.java, WorkPlaceV2Action.java |

| `{id}/delete` | GroupAction.java |

| `{id}/end/process` | AppealInfoAction.java |

| `{id}/manager/status` | AppealInfoAction.java |

| `{id}/refresh/participate` | GroupAction.java |

| `{id}/reset/status` | AppealInfoAction.java |

| `{id}/start/check` | AppealInfoAction.java |

| `{id}/start/process` | AppealInfoAction.java |



## x_bbs_assemble_control

*功能：论坛/BBS*

| 接口路径 | Action 文件 |

|---|---|

| `accept` | ReplyInfoManagerUserAction.java |

| `acceptreply/{id}/{replyId}` | SubjectInfoManagerUserAction.java |

| `all` | BBSConfigSettingAction.java, ForumInfoManagerUserAction.java, RoleInfoAction.java, SectionInfoManagerUserAction.java |

| `attachment` | AttachmentAction.java |

| `bbsName` | BBSConfigSettingAnonymousAction.java |

| `bind/object` | RoleInfoAction.java |

| `bind/role` | RoleInfoAction.java |

| `change/section` | SubjectInfoManagerUserAction.java |

| `code` | BBSConfigSettingAction.java |

| `complete/{id}` | SubjectInfoManagerUserAction.java |

| `creamed/list/page/{page}/count/{count}` | SubjectInfoAction.java |

| `download/{id}` | AttachmentAction.java |

| `download/{id}/stream/{stream}` | AttachmentAction.java |

| `encode/base64/size/{size}` | PictureAction.java |

| `filter/list/page/{page}/count/{count}` | ReplyInfoAction.java, SubjectInfoAction.java |

| `filter/listsubjectinfo/page/{page}/count/{count}` | SubjectInfoAction.java |

| `force/{id}` | SectionInfoManagerUserAction.java |

| `forum` | ForumInfoAction.java |

| `forum/{forumId}` | PermissionInfoAdminAction.java, RoleInfoAction.java, SectionInfoManagerUserAction.java |

| `get/shutup` | ShutupAction.java |

| `index/list/page/{page}/count/{count}` | SubjectInfoAction.java |

| `list/paging/{page}/size/{size}` | ShutupAction.java |

| `list/sub/{id}` | ReplyInfoAction.java |

| `list/subject/{id}` | SubjectAttachmentAction.java |

| `list/subject/{subjectId}` | AttachmentAction.java |

| `lock/{id}` | SubjectInfoManagerUserAction.java |

| `login` | LoginAction.java |

| `logout` | LogoutAction.java |

| `mobile` | MobileIndexAction.java |

| `my/list/page/{page}/count/{count}` | ReplyInfoManagerUserAction.java, SubjectInfoManagerUserAction.java |

| `nonCream/{id}` | SubjectInfoManagerUserAction.java |

| `nonOriginal/{id}` | SubjectInfoManagerUserAction.java |

| `nonRecommendToBBSIndex/{id}` | SubjectInfoManagerUserAction.java |

| `nonTopToBBS/{id}` | SubjectInfoManagerUserAction.java |

| `nonTopToForum/{id}` | SubjectInfoManagerUserAction.java |

| `nonTopToMainSection/{id}` | SubjectInfoManagerUserAction.java |

| `nonTopToSection/{id}` | SubjectInfoManagerUserAction.java |

| `permission` | PermissionInfoAction.java |

| `picture` | PictureAction.java |

| `random` | UUIDAction.java |

| `recommended/index/{count}` | SubjectInfoAction.java |

| `recommended/list/page/{page}/count/{count}` | SubjectInfoAction.java |

| `reply` | ReplyInfoAction.java |

| `replyPublishable/{subjectId}` | PermissionInfoAction.java |

| `role/{roleCode}` | PermissionInfoAdminAction.java |

| `rolecode/selected` | RoleInfoAction.java |

| `save` | ShutupAction.java |

| `search/list/page/{page}/count/{count}` | SubjectInfoAction.java |

| `section` | SectionInfoAction.java |

| `section/{id}/icon` | PictureAction.java |

| `section/{sectionId}` | PermissionInfoAction.java, PermissionInfoAdminAction.java, RoleInfoAction.java |

| `setCream/{id}` | SubjectInfoManagerUserAction.java |

| `setOriginal/{id}` | SubjectInfoManagerUserAction.java |

| `setRecommendToBBSIndex/{id}` | SubjectInfoManagerUserAction.java |

| `setting` | BBSConfigSettingAnonymousAction.java |

| `shutup` | ShutupAction.java |

| `statgrade/sectionName/{sectionName}/subjectType/{subjectType}` | SubjectInfoAction.java |

| `sub/{sectionId}` | SectionInfoManagerUserAction.java |

| `subject` | SubjectInfoAction.java |

| `subject/{subjectId}` | PermissionInfoAction.java |

| `subjectPublishable/{sectionId}` | PermissionInfoAction.java |

| `subjectattach` | SubjectAttachmentAction.java |

| `syn` | SectionInfoAction.java |

| `top/{sectionId}` | SubjectInfoAction.java |

| `topToBBS/{id}` | SubjectInfoManagerUserAction.java |

| `topToForum/{id}` | SubjectInfoManagerUserAction.java |

| `topToMainSection/{id}` | SubjectInfoManagerUserAction.java |

| `topToSection/{id}` | SubjectInfoManagerUserAction.java |

| `unacceptreply/{id}` | SubjectInfoManagerUserAction.java |

| `uncomplete/{id}` | SubjectInfoManagerUserAction.java |

| `unit/selected` | RoleInfoAction.java |

| `unlock/{id}` | SubjectInfoManagerUserAction.java |

| `update/nick/name/{person}` | UserInfoAction.java |

| `upload/subject/{subjectId}` | AttachmentAction.java |

| `upload/subject/{subjectId}/callback/{callback}` | AttachmentAction.java |

| `user/forum` | ForumInfoManagerUserAction.java |

| `user/permission` | PermissionInfoAdminAction.java |

| `user/reply` | ReplyInfoManagerUserAction.java |

| `user/role` | RoleInfoAction.java |

| `user/section` | SectionInfoManagerUserAction.java |

| `user/selected` | RoleInfoAction.java |

| `user/setting` | BBSConfigSettingAction.java |

| `user/subject` | SubjectInfoManagerUserAction.java |

| `userinfo` | UserInfoAction.java |

| `uuid` | UUIDAction.java |

| `view/all` | ForumInfoAction.java, MobileIndexAction.java |

| `view/{id}` | SubjectInfoAction.java |

| `viewforum/{forumId}` | SectionInfoAction.java |

| `viewsub/{sectionId}` | SectionInfoAction.java |

| `vote/submit` | SubjectInfoManagerUserAction.java |

| `voterecord/list/page/{page}/count/{count}` | SubjectInfoManagerUserAction.java |

| `{id}` | AttachmentAction.java, BBSConfigSettingAction.java, ForumInfoAction.java, ForumInfoManagerUserAction.java, ReplyInfoAction.java, ReplyInfoManagerUserAction.java, RoleInfoAction.java, SectionInfoAction.java, SectionInfoManagerUserAction.java, ShutupAction.java, SubjectAttachmentAction.java, SubjectInfoManagerUserAction.java |

| `{id}/binary/base64/{size}` | SubjectAttachmentAction.java |



## x_calendar_assemble_control

*功能：日程管理*

| 接口路径 | Action 文件 |

|---|---|

| `1` | TestAction.java |

| `after/{eventId}` | Calendar_EventAction.java |

| `all/{eventId}` | Calendar_EventAction.java |

| `calendar` | CalendarAction.java |

| `code/{code}` | CalendarSettingAction.java |

| `event` | Calendar_EventAction.java |

| `follow/{id}` | CalendarAction.java |

| `follow/{id}/cancel` | CalendarAction.java |

| `ismanager` | CalendarAction.java, CalendarSettingAction.java |

| `ismanager/calendar/{accountId}` | CalendarAction.java |

| `list/all` | CalendarSettingAction.java |

| `list/filter` | CalendarAction.java, Calendar_EventAction.java |

| `list/filter/sample` | Calendar_EventAction.java |

| `list/my` | CalendarAction.java |

| `list/public` | CalendarAction.java |

| `manage` | Calendar_EventAction.java |

| `manager/list/with/person/{person}` | CalendarAction.java |

| `message` | Calendar_EventMessageAction.java |

| `rfc/{id}` | Calendar_EventAction.java |

| `setting` | CalendarSettingAction.java |

| `single/{eventId}` | Calendar_EventAction.java |

| `test` | TestAction.java |

| `update/after/{eventId}` | Calendar_EventAction.java |

| `update/all/{eventId}` | Calendar_EventAction.java |

| `update/single/{eventId}` | Calendar_EventAction.java |

| `{id}` | CalendarAction.java, CalendarSettingAction.java, Calendar_EventAction.java |



## x_cms_assemble_control

*功能：内容管理/CMS*

| 接口路径 | Action 文件 |

|---|---|

| `achive/{id}` | DocumentAction.java, DocumentAction2.java |

| `alias/{alias}` | AppInfoAction.java, CategoryInfoAction.java |

| `anonymous/document` | DocumentAnonymousAction.java |

| `anonymous/fileinfo` | FileInfoAnonymousAction.java |

| `anonymous/form` | FormAnonymousAction.java |

| `anonymous/script` | ScriptAnonymousAction.java |

| `anonymous/surface/appdict` | AppDictAnonymousAction.java |

| `appInfo/{id}` | AppInfoExportAction.java, AppInfoImportAction.java |

| `appInfo/{id}/manageable` | PermissionAction.java |

| `appInfo/{id}/managers` | PermissionAction.java |

| `appInfo/{id}/publishers` | PermissionAction.java |

| `appInfo/{id}/viewers` | PermissionAction.java |

| `appconfig` | AppInfoConfigAction.java |

| `appinfo` | AppInfoAction.java |

| `base64` | ImageBase64Action.java |

| `batch/data/modify` | DocumentAction.java, DocumentAction2.java |

| `batch/data/modify/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `batch/download/doc/{docId}/site/{site}` | FileInfoAction.java |

| `batch/status` | DocumentAction.java, DocumentAction2.java |

| `batch/{batchId}` | DocumentAction.java, DocumentAction2.java |

| `batch/{batchId}/mockdeletetoget` | DocumentAction.java, DocumentAction2.java |

| `batch/{batchName}/status` | DocumentAction.java, DocumentAction2.java |

| `bind/{categoryId}/view` | CategoryInfoAction.java |

| `bind/{categoryId}/view/mockputtopost` | CategoryInfoAction.java |

| `category/change` | DocumentAction.java, DocumentAction2.java |

| `category/change/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `category/{id}/managers` | PermissionAction.java |

| `category/{id}/publishers` | PermissionAction.java |

| `category/{id}/viewers` | PermissionAction.java |

| `categoryInfo/{id}/manageable` | PermissionAction.java |

| `categoryinfo` | CategoryInfoAction.java |

| `commend` | DocumentCommendAction.java |

| `comment` | DocumentCommentInfoAction.java |

| `compare` | InputAction.java |

| `compare/mockputtopost` | InputAction.java |

| `copy/to/doc/{docId}` | FileInfoAction.java |

| `correlation` | CorrelationAction.java |

| `cover` | InputAction.java |

| `cover/mockputtopost` | InputAction.java |

| `create` | InputAction.java |

| `create/mockputtopost` | InputAction.java |

| `data` | DataAction.java |

| `design/appdict` | AppDictDesignAction.java |

| `designer` | DesignerAction.java |

| `doc/{docId}` | CorrelationAction.java |

| `doc/{docId}/delete` | CorrelationAction.java |

| `docpermission` | PermissionForDocumentAction.java |

| `document` | DocumentAction.java, DocumentAction2.java |

| `document/cipher` | DocumentCipherAction.java |

| `document/fields` | DocumentAction.java, DocumentAction2.java |

| `document/{docId}/filter/list/{id}/next/{count}` | DocumentViewRecordAction.java |

| `document/{docId}/has/view` | DocumentViewRecordAction.java |

| `document/{id}` | DataAction.java |

| `document/{id}/array/data` | DataAction.java |

| `document/{id}/mockdeletetoget` | DataAction.java |

| `document/{id}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}` | DataAction.java |

| `document/{id}/{path0}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}` | DataAction.java |

| `document/{id}/{path0}/{path1}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockputtopost` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockdeletetoget` | DataAction.java |

| `document/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockputtopost` | DataAction.java |

| `download/document/{id}` | FileInfoAction.java, FileInfoAnonymousAction.java |

| `download/document/{id}/stream` | FileInfoAction.java, FileInfoAnonymousAction.java |

| `download/transfer/flag/{flag}` | FileInfoAction.java |

| `draft/list/{id}/next/{count}` | DocumentAction.java, DocumentAction2.java |

| `draft/list/{id}/next/{count}/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `edit/{id}/doc/{docId}` | FileInfoAction.java |

| `edit/{id}/doc/{docId}/mockputtopost` | FileInfoAction.java |

| `encode/base64/size/{size}` | ImageAction.java |

| `erase/app/{id}` | AppInfoAction.java |

| `erase/app/{id}/mockdeletetoget` | AppInfoAction.java |

| `erase/category/{id}` | CategoryInfoAction.java |

| `erase/category/{id}/mockdeletetoget` | CategoryInfoAction.java |

| `export` | AppInfoExportAction.java |

| `extContent` | CategoryInfoAction.java |

| `file` | FileAction.java |

| `fileinfo` | FileInfoAction.java |

| `filter/count` | DocumentAction.java, DocumentAction2.java |

| `filter/count/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `filter/list/{id}/next/{count}` | AppInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentAnonymousAction.java, LogAction.java |

| `filter/list/{id}/next/{count}/app/{appId}` | CategoryInfoAction.java, FormAction.java |

| `filter/list/{id}/next/{count}/app/{appId}/mockputtopost` | CategoryInfoAction.java, FormAction.java |

| `filter/list/{id}/next/{count}/mockputtopost` | AppInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentAnonymousAction.java |

| `filter/list/{id}/prev/{count}` | AppInfoAction.java, DocumentAction.java, DocumentAction2.java, LogAction.java |

| `filter/list/{id}/prev/{count}/app/{appId}` | CategoryInfoAction.java, FormAction.java |

| `filter/list/{id}/prev/{count}/app/{appId}/mockputtopost` | CategoryInfoAction.java, FormAction.java |

| `filter/list/{id}/prev/{count}/mockputtopost` | AppInfoAction.java, DocumentAction.java, DocumentAction2.java |

| `filter/list/{page}/size/{size}` | CategoryInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentAnonymousAction.java, DocumentCipherAction.java |

| `filter/list/{page}/size/{size}/manager` | DocumentAction.java |

| `filter/list/{page}/size/{size}/mockputtopost` | CategoryInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentAnonymousAction.java, DocumentCipherAction.java |

| `form` | FormAction.java |

| `formversion` | FormVersionAction.java |

| `get/user/publish/{appId}` | AppInfoAction.java |

| `image` | ImageAction.java |

| `image/encode` | ImageBase64Action.java |

| `import` | AppInfoImportAction.java |

| `input` | InputAction.java |

| `list` | OutputAction.java, TemplateFormAction.java |

| `list/all` | AppInfoAction.java, CategoryInfoAction.java, FileInfoAction.java, FormAction.java, ViewAction.java, ViewCategoryAction.java, ViewFieldConfigAction.java |

| `list/app/{appId}` | FormAction.java, LogAction.java, ScriptAnonymousAction.java, ViewAction.java |

| `list/app/{appId}/name/{name}` | ScriptAction.java, ScriptAnonymousAction.java |

| `list/app/{flag}` | ScriptAction.java |

| `list/appInfo/{appId}` | AppDictDesignAction.java |

| `list/appInfo/{appInfoFlag}` | AppDictAction.java, AppDictAnonymousAction.java, FileAction.java |

| `list/appType` | AppInfoAction.java |

| `list/appType/manager` | AppInfoAction.java |

| `list/archive/filter/category/{categoryId}` | SearchFilterAction.java |

| `list/category` | TemplateFormAction.java |

| `list/category/mockputtopost` | TemplateFormAction.java |

| `list/category/{categoryId}` | LogAction.java, ViewAction.java, ViewCategoryAction.java |

| `list/doc/{docId}` | CorrelationAction.java |

| `list/doc/{docId}/site/{site}` | CorrelationAction.java |

| `list/document` | DocumentAction.java |

| `list/document/data` | DocumentAction.java, DocumentAction2.java |

| `list/document/{documentId}` | FileInfoAction.java, FileInfoAnonymousAction.java, LogAction.java |

| `list/draft/filter/category/{categoryId}` | SearchFilterAction.java |

| `list/filter` | FileInfoAction.java |

| `list/filter/{page}/size/{size}` | LogAction.java |

| `list/form/{formId}` | FormVersionAction.java, ViewAction.java |

| `list/formfield/appInfo/{appId}` | FormAction.java |

| `list/has/document` | AppInfoAction.java |

| `list/has/document/appType` | AppInfoAction.java |

| `list/has/document/type/{appType}` | AppInfoAction.java |

| `list/install/log/paging/{page}/size/{size}` | DocumentViewRecordAction.java |

| `list/level/{operationLevel}` | LogAction.java |

| `list/manage` | AppInfoAction.java |

| `list/manage/app/{appId}` | CategoryInfoAction.java |

| `list/manage/type/{appType}` | AppInfoAction.java |

| `list/manager` | ScriptAction.java |

| `list/objects` | CategoryInfoAction.java |

| `list/paging/{page}/size/{size}` | AppDictDesignAction.java, DocumentCommendAction.java, ScriptAction.java, ScriptAnonymousAction.java |

| `list/publish/app/{appId}` | CategoryInfoAction.java |

| `list/publish/filter/category/{categoryId}` | SearchFilterAction.java |

| `list/script/{scriptId}` | ScriptVersionAction.java |

| `list/user/publish` | AppInfoAction.java |

| `list/user/publish/type/{appType}` | AppInfoAction.java |

| `list/user/publish/with/process` | AppInfoAction.java |

| `list/user/view` | AppInfoAction.java |

| `list/user/view/all` | AppInfoAction.java |

| `list/user/view/all/type/{appType}` | AppInfoAction.java |

| `list/user/view/article/type/{appType}` | AppInfoAction.java |

| `list/user/view/data` | AppInfoAction.java |

| `list/user/view/data/type/{appType}` | AppInfoAction.java |

| `list/view/app/{appId}` | CategoryInfoAction.java |

| `list/view/app/{appId}/all` | CategoryInfoAction.java |

| `list/view/app/{appId}/data` | CategoryInfoAction.java |

| `list/view/{viewId}` | ViewCategoryAction.java, ViewFieldConfigAction.java |

| `list/{id}/formfield` | FormAction.java |

| `list/{id}/next/{count}` | DocumentCommentInfoAction.java, FileAction.java, ScriptAction.java, ScriptAnonymousAction.java |

| `list/{id}/next/{count}/mockputtopost` | DocumentCommentInfoAction.java |

| `list/{id}/prev/{count}` | DocumentCommentInfoAction.java, FileAction.java, ScriptAction.java, ScriptAnonymousAction.java |

| `list/{id}/prev/{count}/mockputtopost` | DocumentCommentInfoAction.java |

| `list/{page}/size/{size}` | DocumentCommentInfoAction.java |

| `list/{page}/size/{size}/mockputtopost` | DocumentCommentInfoAction.java |

| `log` | LogAction.java |

| `manager/appInfo/{id}` | PermissionAction.java |

| `manager/categoryInfo/{id}` | PermissionAction.java |

| `output` | OutputAction.java |

| `permission` | PermissionAction.java |

| `permission/management` | PermissionManagerAction.java |

| `person/{name}` | DocumentViewRecordAction.java |

| `prepare/cover` | InputAction.java |

| `prepare/cover/mockputtopost` | InputAction.java |

| `prepare/create` | InputAction.java |

| `prepare/create/mockputtopost` | InputAction.java |

| `publish/content` | DocumentAction.java, DocumentAction2.java, DocumentCipherAction.java |

| `publish/content/mockputtopost` | DocumentAction.java, DocumentAction2.java, DocumentCipherAction.java |

| `publish/{id}` | DocumentAction.java, DocumentAction2.java |

| `publish/{id}/cancel` | DocumentAction.java, DocumentAction2.java |

| `publish/{id}/cancel/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `publish/{id}/mockputtopost` | DocumentAction.java, DocumentAction2.java |

| `publisher/appInfo/{id}` | PermissionAction.java |

| `publisher/categoryInfo/{id}` | PermissionAction.java |

| `random` | UUIDAction.java |

| `refresh/all` | PermissionManagerAction.java |

| `refresh/category/{categoryId}` | PermissionManagerAction.java |

| `replace/to/doc/{docId}` | FileInfoAction.java |

| `resize/id/{id}/width/{width}/height/{height}` | ImageAction.java |

| `review` | ReviewAction.java |

| `script` | ScriptAction.java |

| `scriptversion` | ScriptVersionAction.java |

| `search` | DesignerAction.java |

| `searchfilter` | SearchFilterAction.java |

| `surface/appdict` | AppDictAction.java |

| `templateform` | TemplateFormAction.java |

| `unread` | DocumentViewRecordAction.java |

| `unread/mockputtopost` | DocumentViewRecordAction.java |

| `update/doc/{docId}` | CorrelationAction.java |

| `update/document/{docId}/attachment/{id}` | FileInfoAction.java |

| `update/document/{docId}/attachment/{id}/callback/{callback}` | FileInfoAction.java |

| `update/{id}/content` | FileInfoAction.java |

| `upload/doc/{docId}/save/as/{flag}` | FileInfoAction.java |

| `upload/document/{docId}` | FileInfoAction.java |

| `upload/document/{docId}/callback/{callback}` | FileInfoAction.java |

| `upload/with/url` | FileInfoAction.java |

| `uuid` | UUIDAction.java |

| `v2/lookup/document/{docId}` | FormAction.java, FormAnonymousAction.java |

| `v2/lookup/document/{docId}/mobile` | FormAction.java, FormAnonymousAction.java |

| `v2/search` | ReviewAction.java |

| `v2/{id}` | FormAction.java, FormAnonymousAction.java |

| `v2/{id}/mobile` | FormAction.java, FormAnonymousAction.java |

| `view` | ViewAction.java |

| `viewcategory` | ViewCategoryAction.java |

| `viewdata/list/{id}/next/{count}` | ViewAction.java |

| `viewer/appInfo/{id}` | PermissionAction.java |

| `viewer/categoryInfo/{id}` | PermissionAction.java |

| `viewfieldconfig` | ViewFieldConfigAction.java |

| `viewrecord` | DocumentViewRecordAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/data/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/data/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data/mockputtopost` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data` | AppDictAction.java, AppDictAnonymousAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data/mockdeletetoget` | AppDictAction.java |

| `{appDictFlag}/appInfo/{appInfoFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data/mockputtopost` | AppDictAction.java |

| `{appId}` | AppInfoConfigAction.java |

| `{appId}/icon/size/{size}` | AppInfoAction.java |

| `{appInfoFlag}/select` | OutputAction.java |

| `{appInfoFlag}/select/mockputtopost` | OutputAction.java |

| `{flag}` | AppInfoAction.java, CategoryInfoAction.java, FileAction.java |

| `{flag}/appInfo/{appInfoFlag}` | FileAction.java, ScriptAction.java |

| `{flag}/appInfo/{appInfoFlag}/content` | FileAction.java |

| `{flag}/appInfo/{appInfoFlag}/download` | FileAction.java |

| `{flag}/mockdeletetoget` | FileAction.java |

| `{formFlag}/appinfo/{appFlag}` | FormAction.java |

| `{id}` | AppDictDesignAction.java, AppInfoAction.java, AppInfoConfigAction.java, CategoryInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentCommendAction.java, DocumentCommentInfoAction.java, FileAction.java, FileInfoAction.java, FormAction.java, FormAnonymousAction.java, FormVersionAction.java, LogAction.java, ScriptAction.java, ScriptAnonymousAction.java, ScriptVersionAction.java, TemplateFormAction.java, ViewAction.java, ViewCategoryAction.java, ViewFieldConfigAction.java |

| `{id}/binary/base64/{size}` | FileInfoAction.java |

| `{id}/commend` | DocumentAction.java, DocumentAction2.java, DocumentCommentInfoAction.java |

| `{id}/content` | FileAction.java |

| `{id}/control` | AppInfoAction.java, CategoryInfoAction.java, DocumentAction.java, DocumentAction2.java |

| `{id}/doc/{docId}/change/seqnumber/{seqNumber}` | FileInfoAction.java |

| `{id}/document/data` | DocumentAction.java, DocumentAction2.java |

| `{id}/document/{documentId}` | FileInfoAction.java, FileInfoAnonymousAction.java |

| `{id}/download` | FileAction.java |

| `{id}/execute/projection` | CategoryInfoAction.java |

| `{id}/mockdeletetoget` | AppDictDesignAction.java, AppInfoAction.java, CategoryInfoAction.java, DocumentAction.java, DocumentAction2.java, DocumentCommentInfoAction.java, FileInfoAction.java, FormAction.java, ScriptAction.java, TemplateFormAction.java, ViewAction.java, ViewCategoryAction.java, ViewFieldConfigAction.java |

| `{id}/mockputtopost` | AppDictDesignAction.java, FileAction.java, FormAction.java, ScriptAction.java, ViewAction.java, ViewFieldConfigAction.java |

| `{id}/notify` | DocumentAction.java |

| `{id}/online/info` | FileInfoAction.java |

| `{id}/permission` | AppInfoAction.java, CategoryInfoAction.java |

| `{id}/permission/read` | DocumentAction.java, DocumentAction2.java |

| `{id}/permission/read/person/{person}` | DocumentCipherAction.java |

| `{id}/persist/view/record` | DocumentCipherAction.java |

| `{id}/persons` | DocumentAction.java, DocumentAction2.java |

| `{id}/preview/pdf` | FileInfoAction.java |

| `{id}/publish/html` | DocumentAction.java |

| `{id}/top` | DocumentAction.java, DocumentAction2.java |

| `{id}/unTop` | DocumentAction.java, DocumentAction2.java |

| `{id}/uncommend` | DocumentAction.java, DocumentAction2.java, DocumentCommentInfoAction.java |

| `{id}/update` | DocumentAction.java |

| `{id}/upload` | FileAction.java |

| `{id}/view` | DocumentAction.java, DocumentAction2.java, DocumentAnonymousAction.java |

| `{id}/view/count` | DocumentAction.java, DocumentAction2.java |

| `{uniqueName}/app/{flag}` | ScriptAction.java |

| `{uniqueName}/app/{flag}/imported` | ScriptAction.java |



## x_component_assemble_control

*功能：组件管理*

| 接口路径 | Action 文件 |

|---|---|

| `component` | ComponentAction.java |

| `delete/all` | ComponentAction.java |

| `list` | StatusAction.java |

| `list/all` | ComponentAction.java |

| `status` | StatusAction.java |

| `{flag}` | ComponentAction.java |



## x_correlation_service_processing

*功能：数据关联*

| 接口路径 | Action 文件 |

|---|---|

| `correlation` | CorrelationAction.java |

| `delete/type/cms/document/{document}` | CorrelationAction.java |

| `delete/type/processplatform/job/{job}` | CorrelationAction.java |

| `list/type/cms/document/{document}` | CorrelationAction.java |

| `list/type/cms/document/{document}/site/{site}` | CorrelationAction.java |

| `list/type/processplatform/job/{job}` | CorrelationAction.java |

| `list/type/processplatform/job/{job}/site/{site}` | CorrelationAction.java |

| `readable/type/cms` | CorrelationAction.java |

| `readable/type/processplatform` | CorrelationAction.java |

| `type/cms/document/{document}` | CorrelationAction.java |

| `type/processplatform/job/{job}` | CorrelationAction.java |

| `update/type/cms/document/{document}` | CorrelationAction.java |

| `update/type/processplatform/job/{job}` | CorrelationAction.java |



## x_file_assemble_control

*功能：文件管理*

| 接口路径 | Action 文件 |

|---|---|

| `anonymous/file` | FileAnonymousAction.java |

| `attachment` | AttachmentAction.java |

| `attachment2` | Attachment2Action.java |

| `batch/download` | Folder2Action.java |

| `clean/unused/referencetype/cmsdocument/manage` | FileAction.java |

| `complex` | ComplexAction.java |

| `config` | ConfigAction.java |

| `copy/attachment/{attachmentId}/referencetype/{referenceType}/reference/{reference}/scale/{scale}` | FileAction.java |

| `download/share/{shareId}/file/{fileId}` | ShareAction.java |

| `editor` | EditorAction.java |

| `empty` | RecycleAction.java |

| `exist/file/{fileMd5}` | Attachment2Action.java |

| `file` | FileAction.java |

| `folder` | FolderAction.java |

| `folder/{id}` | ComplexAction.java |

| `folder2` | Folder2Action.java |

| `is/file/manager` | ConfigAction.java |

| `list` | EditorAction.java, RecycleAction.java, ShareAction.java |

| `list/att/share/{shareId}/folder/{folderId}/` | ShareAction.java |

| `list/editor/{owner}` | Attachment2Action.java, AttachmentAction.java |

| `list/filter/{name}` | Attachment2Action.java |

| `list/folder/share/{shareId}/folder/{folderId}/` | ShareAction.java |

| `list/folder/{folderId}` | Attachment2Action.java, AttachmentAction.java |

| `list/my` | ShareAction.java |

| `list/my2/{shareType}/{fileType}` | ShareAction.java |

| `list/referencetype` | FileAction.java |

| `list/referencetype/{referenceType}/reference/{reference}` | FileAction.java |

| `list/share/{owner}` | Attachment2Action.java, AttachmentAction.java |

| `list/to/me` | ShareAction.java |

| `list/to/me2/{fileType}` | ShareAction.java |

| `list/top` | Attachment2Action.java, AttachmentAction.java, Folder2Action.java, FolderAction.java |

| `list/type/{page}/size/{size}` | Attachment2Action.java |

| `list/unused/referencetype/cmsdocument/manage` | FileAction.java |

| `list/{id}` | Folder2Action.java, FolderAction.java |

| `list/{id}/next/{count}` | FileAction.java |

| `list/{id}/next/{count}/all` | FileAction.java |

| `list/{id}/next/{count}/referencetype/{referenceType}` | FileAction.java |

| `list/{id}/prev/{count}` | FileAction.java |

| `list/{id}/prev/{count}/all` | FileAction.java |

| `list/{id}/prev/{count}/referencetype/{referenceType}` | FileAction.java |

| `recycle` | RecycleAction.java |

| `referencetype/{referenceType}/reference/{reference}` | FileAction.java |

| `share` | ShareAction.java |

| `share/{shareId}/file/{fileId}/folder/{folderId}` | ShareAction.java |

| `shield/{id}` | ShareAction.java |

| `system/config` | ConfigAction.java |

| `top` | ComplexAction.java |

| `upload/folder/{folderId}` | Attachment2Action.java, AttachmentAction.java |

| `upload/folder/{folderId}/callback/{callback}` | AttachmentAction.java |

| `upload/referencetype/{referenceType}/reference/{reference}/scale/{scale}` | FileAction.java |

| `upload/referencetype/{referenceType}/reference/{reference}/scale/{scale}/callback/{callback}` | FileAction.java |

| `upload/with/url` | FileAction.java |

| `user/capacity` | Attachment2Action.java |

| `{id}` | Attachment2Action.java, AttachmentAction.java, FileAction.java, Folder2Action.java, FolderAction.java, RecycleAction.java, ShareAction.java |

| `{id}/binary/base64` | Attachment2Action.java, AttachmentAction.java, FileAction.java |

| `{id}/delete` | RecycleAction.java |

| `{id}/download` | Attachment2Action.java, AttachmentAction.java, FileAction.java, FileAnonymousAction.java, Folder2Action.java |

| `{id}/download/image/width/{width}/height/{height}` | Attachment2Action.java |

| `{id}/download/stream` | Attachment2Action.java, AttachmentAction.java, FileAction.java, FileAnonymousAction.java |

| `{id}/image/scale/{scale}/binary/base64` | Attachment2Action.java, AttachmentAction.java |

| `{id}/image/width/{width}/height/{height}/binary/base64` | Attachment2Action.java, AttachmentAction.java |

| `{id}/office/preview/type/{type}` | Attachment2Action.java |

| `{id}/password/{password}` | ShareAction.java |

| `{id}/resume` | RecycleAction.java |

| `{id}/update` | AttachmentAction.java |

| `{id}/update/callback/{callback}` | AttachmentAction.java |



## x_general_assemble_control

*功能：通用服务（行政区划/二维码/工作日等）*

| 接口路径 | Action 文件 |

|---|---|

| `2021090901` | UpgradeAction.java |

| `2021090902` | UpgradeAction.java |

| `area` | AreaAction.java |

| `betweenholidaycount/start/{startDate}/end/{endDate}` | WorkTimeAction.java |

| `betweenminutes/start/{start}/end/{end}` | WorkTimeAction.java |

| `check` | EcnetAction.java |

| `create` | InvoiceAction.java |

| `delete/{id}` | InvoiceAction.java |

| `download/flag/{flag}` | GeneralFileAction.java, InvoiceAction.java |

| `ecnet` | EcnetAction.java |

| `enable` | SecurityClearanceAction.java |

| `excel` | ExcelAction.java |

| `excelName/{excelName}` | ExcelAction.java |

| `excelName/{excelName}/sheetList` | ExcelAction.java |

| `flag/{flag}` | GeneralFileAction.java |

| `flag/{flag}/binary/base64` | GeneralFileAction.java |

| `forwarddays/start/{start}/days/{days}` | WorkTimeAction.java |

| `forwardminutes/start/{start}/minutes/{minutes}` | WorkTimeAction.java |

| `generalfile` | GeneralFileAction.java |

| `get/{id}` | InvoiceAction.java |

| `html/to/word` | OfficeAction.java |

| `html/to/word/result/{flag}` | OfficeAction.java |

| `indefinedholiday/{date}` | WorkTimeAction.java |

| `indefinedworkday/{date}` | WorkTimeAction.java |

| `invoice` | InvoiceAction.java |

| `isholiday/{date}` | WorkTimeAction.java |

| `isworkday/{date}` | WorkTimeAction.java |

| `isworktime/{date}` | WorkTimeAction.java |

| `list` | AreaAction.java |

| `list/paging/{page}/size/{size}` | InvoiceAction.java |

| `list/province/{province}` | AreaAction.java |

| `list/province/{province}/city/{city}` | AreaAction.java |

| `list/province/{province}/city/{city}/district/{district}` | AreaAction.java |

| `minutesofworkday` | WorkTimeAction.java |

| `object` | SecurityClearanceAction.java |

| `office` | OfficeAction.java |

| `qrcode` | QrCodeAction.java |

| `result/{flag}` | ExcelAction.java |

| `securityclearance` | SecurityClearanceAction.java |

| `subject` | SecurityClearanceAction.java |

| `system` | SecurityClearanceAction.java |

| `update/apply/status/{id}` | InvoiceAction.java |

| `update/{id}` | InvoiceAction.java |

| `upgrade` | UpgradeAction.java |

| `upload` | ExcelAction.java, InvoiceAction.java |

| `upload/for/create` | InvoiceAction.java |

| `upload/with/url` | ExcelAction.java, InvoiceAction.java |

| `width/{width}/height/{height}/text/{text}` | QrCodeAction.java |

| `worktime` | WorkTimeAction.java |



## x_hotpic_assemble_control

*功能：热点图管理*

| 接口路径 | Action 文件 |

|---|---|

| `bbs/{id}` | HotPictureInfoCipherAction.java |

| `changeTitle` | HotPictureInfoAction.java |

| `cipher/hotpic` | HotPictureInfoCipherAction.java |

| `cms/{id}` | HotPictureInfoCipherAction.java |

| `exists/check` | HotPictureInfoAction.java |

| `filter/list/page/{page}/count/{count}` | HotPictureInfoAction.java, HotPictureInfoCipherAction.java |

| `user/hotpic` | HotPictureInfoAction.java |

| `{application}/{infoId}` | HotPictureInfoAction.java |

| `{id}` | HotPictureInfoAction.java, HotPictureInfoCipherAction.java |



## x_jpush_assemble_control

*功能：消息推送*

| 接口路径 | Action 文件 |

|---|---|

| `bind` | DeviceAction.java |

| `check/{deviceName}/{deviceType}/{pushType}` | DeviceAction.java |

| `config/push/type` | DeviceAction.java |

| `device` | DeviceAction.java |

| `list/{pushType}` | DeviceAction.java |

| `message` | MessageAction.java |

| `send` | MessageAction.java |

| `test/send` | MessageAction.java |

| `unbind/new/{deviceName}/{deviceType}/{pushType}` | DeviceAction.java |

| `unbind/{deviceName}/{deviceType}` | DeviceAction.java |



## x_meeting_assemble_control

*功能：会议管理*

| 接口路径 | Action 文件 |

|---|---|

| `/list/like/pinyin/{key}` | BuildingAction.java |

| `attachment` | AttachmentAction.java |

| `building` | BuildingAction.java |

| `config` | ConfigAction.java |

| `create/from/processplatform` | AttachmentAction.java |

| `list` | BuildingAction.java, RoomAction.java |

| `list/applied/completed` | MeetingAction.java |

| `list/applied/processing` | MeetingAction.java |

| `list/applied/wait` | MeetingAction.java |

| `list/apply/{page}/size/{size}` | MeetingAction.java |

| `list/coming/day/{count}` | MeetingAction.java |

| `list/coming/month/{count}` | MeetingAction.java |

| `list/forward/monthcount/{monthCount}` | MeetingAction.java |

| `list/forward/monthcount/{monthCount}/all` | MeetingAction.java |

| `list/invite/{page}/size/{size}` | MeetingAction.java |

| `list/invited/completed` | MeetingAction.java |

| `list/invited/processing` | MeetingAction.java |

| `list/invited/rejected` | MeetingAction.java |

| `list/invited/wait` | MeetingAction.java |

| `list/like/pinyin/{key}` | RoomAction.java |

| `list/like/{key}` | BuildingAction.java, RoomAction.java |

| `list/meeting/{meetingId}` | AttachmentAction.java |

| `list/pinyininitial/{key}` | BuildingAction.java, RoomAction.java |

| `list/room` | OpenMeetingAction.java |

| `list/start/{start}/completed/{completed}` | BuildingAction.java |

| `list/start/{start}/completed/{completed}/allmeeting` | BuildingAction.java |

| `list/start/{start}/completed/{completed}/room/{room}/meeting/{meeting}` | BuildingAction.java |

| `list/wait/accept` | MeetingAction.java |

| `list/wait/confirm` | MeetingAction.java |

| `list/year/{year}/month/{month}` | MeetingAction.java |

| `list/year/{year}/month/{month}/all` | MeetingAction.java |

| `list/year/{year}/month/{month}/day/{day}` | MeetingAction.java |

| `list/year/{year}/month/{month}/day/{day}/all` | MeetingAction.java |

| `list/year/{year}/month/{month}/day/{day}/{roomId}` | MeetingAction.java |

| `list/{id}/next/{count}` | AttachmentAction.java, MeetingAction.java |

| `list/{id}/prev/{count}` | AttachmentAction.java, MeetingAction.java |

| `list/{page}/size/{size}` | MeetingAction.java |

| `list/{page}/size/{size}/manage` | MeetingAction.java |

| `meeting` | MeetingAction.java |

| `meeting/{meetingId}/upload/{summary}` | AttachmentAction.java |

| `meeting/{meetingId}/upload/{summary}/callback/{callback}` | AttachmentAction.java |

| `openmeeting` | OpenMeetingAction.java |

| `room` | RoomAction.java |

| `system/config` | ConfigAction.java |

| `system/config/manage` | ConfigAction.java |

| `{id}` | AttachmentAction.java, BuildingAction.java, MeetingAction.java, RoomAction.java |

| `{id}/accept` | MeetingAction.java |

| `{id}/add/invite` | MeetingAction.java |

| `{id}/checkin` | MeetingAction.java |

| `{id}/checkin/code` | MeetingAction.java |

| `{id}/confirm/allow` | MeetingAction.java |

| `{id}/confirm/deny` | MeetingAction.java |

| `{id}/delete/invite` | MeetingAction.java |

| `{id}/download/{stream}` | AttachmentAction.java |

| `{id}/manual/completed` | MeetingAction.java |

| `{id}/modify/completedtime` | MeetingAction.java |

| `{id}/modify/starttime` | MeetingAction.java |

| `{id}/photo` | RoomAction.java |

| `{id}/reject` | MeetingAction.java |

| `{id}/update` | AttachmentAction.java |

| `{id}/update/callback/{ballback}` | AttachmentAction.java |



## x_message_assemble_communicate

*功能：即时通讯/消息*

| 接口路径 | Action 文件 |

|---|---|

| `connector` | ConnectorAction.java |

| `consume` | ConsumeAction.java |

| `conversation` | ImAction.java |

| `conversation/business/{businessId}` | ImAction.java |

| `conversation/list/my` | ImAction.java |

| `conversation/list/with/person` | ImAction.java |

| `conversation/mockputtopost` | ImAction.java |

| `conversation/{id}` | ImAction.java |

| `conversation/{id}/group` | ImAction.java |

| `conversation/{id}/group/mockdeletetoget` | ImAction.java |

| `conversation/{id}/icon` | ImAction.java |

| `conversation/{id}/read` | ImAction.java |

| `conversation/{id}/read/mockputtopost` | ImAction.java |

| `conversation/{id}/single` | ImAction.java |

| `conversation/{id}/single/mockdeletetoget` | ImAction.java |

| `conversation/{id}/top/cancel` | ImAction.java |

| `conversation/{id}/top/cancel/mockputtopost` | ImAction.java |

| `conversation/{id}/top/set` | ImAction.java |

| `conversation/{id}/top/set/mockputtopost` | ImAction.java |

| `count/person` | WsAction.java |

| `currentperson/consumed` | InstantAction.java |

| `currentperson/consumed/all` | InstantAction.java |

| `currentperson/consumed/mockputtopost` | InstantAction.java |

| `custom/create` | MessageAction.java |

| `enable/type` | MassAction.java |

| `im` | ImAction.java |

| `instant` | InstantAction.java |

| `list/currentperson/consumed/count/{count}/asc` | InstantAction.java |

| `list/currentperson/consumed/count/{count}/desc` | InstantAction.java |

| `list/currentperson/count/{count}/asc` | InstantAction.java |

| `list/currentperson/count/{count}/desc` | InstantAction.java |

| `list/currentperson/noim/count/{count}/desc` | InstantAction.java |

| `list/currentperson/not/consumed/count/{count}/asc` | InstantAction.java |

| `list/currentperson/not/consumed/count/{count}/desc` | InstantAction.java |

| `list/paging/{page}/size/{size}` | MessageAction.java |

| `list/person` | WsAction.java |

| `list/person/current/node` | WsAction.java |

| `list/{consume}/count/{count}` | ConsumeAction.java |

| `list/{consume}/currentperson/count/{count}` | ConsumeAction.java |

| `list/{consume}/person/{person}/count/{count}` | ConsumeAction.java |

| `list/{id}/next/{count}` | InstantAction.java, MassAction.java |

| `list/{id}/prev/{count}` | InstantAction.java, MassAction.java |

| `manager/config` | ImAction.java |

| `mass` | MassAction.java |

| `message` | MessageAction.java |

| `msg` | ImAction.java |

| `msg/clear` | ImAction.java |

| `msg/collection` | ImAction.java |

| `msg/collection/list/{page}/size/{size}` | ImAction.java |

| `msg/collection/remove` | ImAction.java |

| `msg/download/{id}` | ImAction.java |

| `msg/download/{id}/image/width/{width}/height/{height}` | ImAction.java |

| `msg/list/object` | ImAction.java |

| `msg/list/{page}/size/{size}` | ImAction.java |

| `msg/revoke/{id}` | ImAction.java |

| `msg/upload/{conversationId}/type/{type}` | ImAction.java |

| `type/{type}` | ConsumeAction.java |

| `type/{type}/mockputtopost` | ConsumeAction.java |

| `ws` | WsAction.java |

| `{id}` | MassAction.java |

| `{id}/mockdeletetoget` | MassAction.java |

| `{id}/type/{type}` | ConsumeAction.java |



## x_mind_assemble_control

*功能：脑图/思维导图*

| 接口路径 | Action 文件 |

|---|---|

| `filter/list/{id}/next/{count}` | MindInfoAction.java |

| `filter/recived/{id}/next/{count}` | MindInfoAction.java |

| `filter/recycle/{id}/next/{count}` | MindInfoAction.java |

| `filter/shared/{id}/next/{count}` | MindInfoAction.java |

| `folder` | MindFolderInfoAction.java |

| `list/{id}/shareRecords` | MindInfoAction.java |

| `list/{id}/version` | MindInfoAction.java |

| `mind` | MindInfoAction.java |

| `move/{folderId}` | MindFolderInfoAction.java |

| `recycle/{id}` | MindInfoAction.java |

| `restore/{id}` | MindInfoAction.java |

| `save` | MindFolderInfoAction.java, MindInfoAction.java |

| `share/{id}` | MindInfoAction.java |

| `share/{shareId}/cancel` | MindInfoAction.java |

| `tree/my` | MindFolderInfoAction.java |

| `version/{id}` | MindInfoAction.java |

| `view/{id}` | MindInfoAction.java |

| `{id}` | MindFolderInfoAction.java, MindInfoAction.java |

| `{id}/destorymind` | MindInfoAction.java |

| `{id}/force` | MindFolderInfoAction.java |

| `{id}/icon` | MindInfoAction.java |

| `{mindId}/icon/size/{size}` | MindInfoAction.java |

| `{recycleId}/destoryrecycle` | MindInfoAction.java |



## x_organization_assemble_authentication

*功能：用户认证*

| 接口路径 | Action 文件 |

|---|---|

| `andfx` | AndFxAction.java |

| `auth` | OauthAction.java |

| `authentication` | AuthenticationAction.java |

| `bind` | AuthenticationAction.java, BindAction.java |

| `bind/code/{code}` | MPweixinAction.java |

| `bind/meta/{meta}` | AuthenticationAction.java |

| `bind/openid/{openid}` | MPweixinAction.java |

| `captcha` | AuthenticationAction.java |

| `captcha/width/{width}/height/{height}` | AuthenticationAction.java |

| `captchaRSAPublicKey` | AuthenticationAction.java |

| `check/token` | AuthenticationAction.java |

| `client/{client}/token/{token}` | SsoAction.java |

| `code` | AuthenticationAction.java |

| `code/credential/{credential}` | AuthenticationAction.java |

| `code/{code}` | DingdingAction.java, QiyeweixinAction.java, WeLinkAction.java, ZhengwuDingdingAction.java |

| `dingding` | DingdingAction.java |

| `encrypt` | SsoAction.java |

| `encrypt/client/{client}/key/{key}/credential/{credential}` | SsoAction.java |

| `info` | DingdingAction.java, OauthAction.java, ZhengwuDingdingAction.java |

| `info/jira` | OauthAction.java |

| `info/sign` | QiyeweixinAction.java |

| `list` | BindAction.java |

| `login/code/{code}` | MPweixinAction.java |

| `menu/test/send/to/{person}` | MPweixinAction.java |

| `moa/sso/token/{token}/enter/{enterId}` | AndFxAction.java |

| `mockdeletetoget` | AuthenticationAction.java |

| `mode` | AuthenticationAction.java |

| `mpweixin` | MPweixinAction.java |

| `oauth` | OauthAction.java |

| `oauth/bind/name/{name}/code/{code}/redirecturi/{redirectUri}` | AuthenticationAction.java |

| `oauth/dingding/config` | AuthenticationAction.java |

| `oauth/list` | AuthenticationAction.java |

| `oauth/login/dingding/code/{code}` | AuthenticationAction.java |

| `oauth/login/name/{name}/code/{code}/redirecturi/{redirectUri}` | AuthenticationAction.java |

| `oauth/login/qywx/code/{code}` | AuthenticationAction.java |

| `oauth/name/{name}` | AuthenticationAction.java |

| `oauth/qywx/config` | AuthenticationAction.java |

| `qiyeweixin` | QiyeweixinAction.java |

| `safe/logout` | AuthenticationAction.java |

| `sso` | SsoAction.java |

| `switchuser` | AuthenticationAction.java |

| `switchuser/mockputtopost` | AuthenticationAction.java |

| `token` | OauthAction.java |

| `token/jira` | OauthAction.java |

| `two/factory/login` | AuthenticationAction.java |

| `update/person/detail/{code}` | QiyeweixinAction.java |

| `welink` | WeLinkAction.java |

| `zhengwudingding` | ZhengwuDingdingAction.java |



## x_organization_assemble_control

*功能：组织架构管理*

| 接口路径 | Action 文件 |

|---|---|

| `ban/{flag}` | PersonAction.java |

| `check/password/{password}` | PersonAction.java |

| `createCode/{cardId}` | PersonCardAction.java |

| `createQR/{cardId}` | PersonCardAction.java |

| `distinct/name` | UnitDutyAction.java |

| `distinct/name/like/{key}` | UnitDutyAction.java |

| `export` | ExportAction.java |

| `export/all` | ExportAction.java |

| `get/root` | UnitAction.java |

| `group` | GroupAction.java |

| `identity` | IdentityAction.java |

| `identity/{identityFlag}/level/{level}` | UnitAction.java |

| `identity/{identityFlag}/type/{type}` | UnitAction.java |

| `inputperson` | InputPersonAction.java |

| `list` | PermissionSettingAction.java, UnitAction.java |

| `list/control/top` | UnitAction.java |

| `list/controller` | UnitAction.java |

| `list/delete/{page}/size/{size}` | PersonAction.java |

| `list/filter/{page}/size/{size}` | PersonAction.java |

| `list/group/{groupFlag}` | RoleAction.java |

| `list/group/{groupFlag}/sub/direct` | PersonAction.java |

| `list/group/{groupFlag}/sub/nested` | PersonAction.java |

| `list/identity/{identityFlag}` | UnitDutyAction.java |

| `list/like` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java, UnitDutyAction.java |

| `list/like/mockputtopost` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/like/pinyin` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/like/pinyin/mockputtopost` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/name/{name}` | UnitDutyAction.java |

| `list/person/{personFlag}` | IdentityAction.java, PersonAttributeAction.java, RoleAction.java |

| `list/person/{personFlag}/sup/direct` | GroupAction.java |

| `list/person/{personFlag}/sup/nested` | GroupAction.java |

| `list/pinyininitial` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/pinyininitial/mockputtopost` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/role/{roleFlag}` | GroupAction.java, PersonAction.java |

| `list/top` | UnitAction.java |

| `list/top/type/{type}` | UnitAction.java |

| `list/type` | UnitAction.java |

| `list/unit/type` | UnitAction.java |

| `list/unit/type/mockputtopost` | UnitAction.java |

| `list/unit/{flag}` | UnitAttributeAction.java |

| `list/unit/{unitFlag}` | IdentityAction.java, UnitDutyAction.java |

| `list/unitduty/name/{unitDutyName}` | IdentityAction.java |

| `list/{flag}/next/{count}` | GroupAction.java, IdentityAction.java, PersonAction.java, PersonAttributeAction.java, RoleAction.java, UnitAction.java, UnitAttributeAction.java, UnitDutyAction.java |

| `list/{flag}/prev/{count}` | GroupAction.java, IdentityAction.java, PersonAction.java, PersonAttributeAction.java, RoleAction.java, UnitAction.java, UnitAttributeAction.java, UnitDutyAction.java |

| `list/{flag}/sub/direct` | GroupAction.java, UnitAction.java |

| `list/{flag}/sub/direct/type/{type}` | UnitAction.java |

| `list/{flag}/sub/nested` | GroupAction.java, UnitAction.java |

| `list/{flag}/sup/direct` | GroupAction.java |

| `list/{flag}/sup/nested` | GroupAction.java, UnitAction.java |

| `list/{flag}/sup/nested/type/{type}` | UnitAction.java |

| `list/{flag}/unitduty/name/{unitDutyName}` | IdentityAction.java |

| `listPersonalVCf/{idList}` | PersonCardAction.java |

| `listVCf/{idList}` | PersonCardAction.java |

| `listgrouptypes` | PersonCardAction.java |

| `listpaging/page/{page}/size/{size}` | PersonCardAction.java |

| `listpaging/page/{page}/size/{size}/mockputtopost` | PersonCardAction.java |

| `listpagingwithgroup/page/{page}/size/{size}` | PersonCardAction.java |

| `listpagingwithgroup/page/{page}/size/{size}/mockputtopost` | PersonCardAction.java |

| `lock/{flag}` | PersonAction.java |

| `loginrecord` | LoginRecordAction.java |

| `mylist` | PersonCardAction.java |

| `permissionsetting` | PermissionSettingAction.java |

| `person` | PersonAction.java |

| `personattribute` | PersonAttributeAction.java |

| `personcard` | PersonCardAction.java |

| `result/flag/{flag}` | ExportAction.java, InputPersonAction.java |

| `role` | RoleAction.java |

| `template` | InputPersonAction.java |

| `unban/{flag}` | PersonAction.java |

| `unit` | UnitAction.java |

| `unitattribute` | UnitAttributeAction.java |

| `unitduty` | UnitDutyAction.java |

| `unlock/{flag}` | PersonAction.java |

| `update/member` | UnitDutyAction.java |

| `wipe` | InputPersonAction.java |

| `zhengwudingding/person` | ExportAction.java |

| `{flag}` | GroupAction.java, IdentityAction.java, PermissionSettingAction.java, PersonAction.java, PersonAttributeAction.java, PersonCardAction.java, RoleAction.java, UnitAction.java, UnitAttributeAction.java, UnitDutyAction.java |

| `{flag}/add/member` | GroupAction.java |

| `{flag}/add/member/mockputtopost` | GroupAction.java |

| `{flag}/delete/member` | GroupAction.java |

| `{flag}/delete/member/mockputtopost` | GroupAction.java |

| `{flag}/icon` | PersonAction.java |

| `{flag}/icon/mockputtopost` | PersonAction.java |

| `{flag}/mockdeletetoget` | GroupAction.java, IdentityAction.java, PermissionSettingAction.java, PersonAction.java, PersonAttributeAction.java, PersonCardAction.java, RoleAction.java, UnitAction.java, UnitAttributeAction.java, UnitDutyAction.java |

| `{flag}/mockputtopost` | GroupAction.java, IdentityAction.java, PermissionSettingAction.java, PersonAction.java, PersonAttributeAction.java, RoleAction.java, UnitAction.java, UnitAttributeAction.java, UnitDutyAction.java |

| `{flag}/order/before/{followFlag}` | IdentityAction.java |

| `{flag}/reserve` | PersonAction.java |

| `{flag}/reserve/mockdeletetoget` | PersonAction.java |

| `{flag}/reset/password` | PersonAction.java |

| `{flag}/set/password` | PersonAction.java |

| `{flag}/set/password/expired/time/{date}` | PersonAction.java |

| `{flag}/set/password/mockputtopost` | PersonAction.java |

| `{flag}/sup/direct` | UnitAction.java |

| `{stream}` | LoginRecordAction.java |



## x_organization_assemble_express

*功能：组织查询表达式*

| 接口路径 | Action 文件 |

|---|---|

| `append/person/name` | PersonAttributeAction.java |

| `append/unit/name` | UnitAttributeAction.java |

| `auth/info/{flag}` | PersonAction.java |

| `check/unit/has/identity` | UnitAction.java |

| `check/unit/has/person` | UnitAction.java |

| `check/unit/has/unit` | UnitAction.java |

| `detail/{flag}` | PersonAction.java |

| `distinguishedname` | DistinguishedNameAction.java |

| `empower` | EmpowerAction.java |

| `empowerlog` | EmpowerLogAction.java |

| `find/by/unit/name` | UnitDutyAction.java |

| `group` | GroupAction.java |

| `has/role` | GroupAction.java, PersonAction.java |

| `identity` | IdentityAction.java |

| `identity/level` | UnitAction.java |

| `identity/level/object` | UnitAction.java |

| `identity/type` | UnitAction.java |

| `identity/type/object` | UnitAction.java |

| `list` | DistinguishedNameAction.java, GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/all` | PersonAction.java, UnitAction.java |

| `list/all/object` | PersonAction.java, UnitAction.java |

| `list/attribute/person/name` | PersonAttributeAction.java |

| `list/attribute/unit/name` | UnitAttributeAction.java |

| `list/filter/{page}/size/{size}` | PersonAction.java |

| `list/group` | IdentityAction.java, PersonAction.java |

| `list/group/object` | IdentityAction.java, PersonAction.java |

| `list/group/sub/direct` | GroupAction.java |

| `list/group/sub/direct/object` | GroupAction.java |

| `list/group/sub/nested` | GroupAction.java |

| `list/group/sub/nested/object` | GroupAction.java |

| `list/group/sup/direct` | GroupAction.java |

| `list/group/sup/direct/object` | GroupAction.java |

| `list/group/sup/nested` | GroupAction.java |

| `list/group/sup/nested/object` | GroupAction.java |

| `list/group/tree` | GroupAction.java |

| `list/identity` | GroupAction.java, PersonAction.java, UnitAction.java |

| `list/identity/object` | EmpowerAction.java, GroupAction.java, PersonAction.java, UnitAction.java |

| `list/identity/sup/nested` | UnitAction.java |

| `list/identity/sup/nested/object` | UnitAction.java |

| `list/identity/unit/name` | UnitDutyAction.java |

| `list/identity/unit/name/object` | UnitDutyAction.java |

| `list/level` | UnitAction.java |

| `list/level/name/object` | UnitAction.java |

| `list/level/object` | UnitAction.java |

| `list/login/after` | PersonAction.java |

| `list/login/after/object` | PersonAction.java |

| `list/login/recent` | PersonAction.java |

| `list/login/recent/object` | PersonAction.java |

| `list/major/person` | IdentityAction.java |

| `list/major/person/object` | IdentityAction.java |

| `list/name` | UnitDutyAction.java |

| `list/name/identity` | UnitDutyAction.java |

| `list/name/person` | PersonAttributeAction.java |

| `list/name/unit` | UnitAttributeAction.java, UnitDutyAction.java |

| `list/object` | GroupAction.java, IdentityAction.java, PersonAction.java, RoleAction.java, UnitAction.java |

| `list/pair/identity` | PersonAction.java |

| `list/person` | GroupAction.java, IdentityAction.java, RoleAction.java, UnitAction.java |

| `list/person/object` | GroupAction.java, IdentityAction.java, PersonAttributeAction.java, RoleAction.java, UnitAction.java |

| `list/person/sub/direct` | PersonAction.java |

| `list/person/sub/direct/object` | PersonAction.java |

| `list/person/sub/nested` | PersonAction.java |

| `list/person/sub/nested/object` | PersonAction.java |

| `list/person/sup/direct` | PersonAction.java |

| `list/person/sup/direct/object` | PersonAction.java |

| `list/person/sup/nested` | PersonAction.java, UnitAction.java |

| `list/person/sup/nested/object` | PersonAction.java, UnitAction.java |

| `list/personattribute` | PersonAction.java |

| `list/personattribute/object` | PersonAction.java |

| `list/role` | PersonAction.java |

| `list/role/object` | PersonAction.java |

| `list/type/{type}/object` | UnitAction.java |

| `list/types` | UnitAction.java |

| `list/types/object` | UnitAction.java |

| `list/unit/object` | UnitAttributeAction.java, UnitDutyAction.java |

| `list/unit/person` | IdentityAction.java |

| `list/unit/person/object` | IdentityAction.java |

| `list/unit/sub/direct` | IdentityAction.java, PersonAction.java, UnitAction.java |

| `list/unit/sub/direct/like` | PersonAction.java |

| `list/unit/sub/direct/like/object` | PersonAction.java |

| `list/unit/sub/direct/object` | IdentityAction.java, PersonAction.java, UnitAction.java |

| `list/unit/sub/nested` | IdentityAction.java, PersonAction.java, UnitAction.java |

| `list/unit/sub/nested/like` | PersonAction.java |

| `list/unit/sub/nested/like/object` | PersonAction.java |

| `list/unit/sub/nested/object` | IdentityAction.java, PersonAction.java, UnitAction.java |

| `list/unit/sup/direct` | UnitAction.java |

| `list/unit/sup/direct/object` | UnitAction.java |

| `list/unit/sup/nested` | UnitAction.java |

| `list/unit/sup/nested/object` | UnitAction.java |

| `list/unit/tree` | UnitAction.java |

| `list/unitattribute` | UnitAction.java |

| `list/unitattribute/object` | UnitAction.java |

| `list/unitduty` | UnitAction.java |

| `list/unitduty/object` | UnitAction.java |

| `mobile/{flag}` | PersonAction.java |

| `nick/name/{flag}` | PersonAction.java |

| `person` | PersonAction.java |

| `personattribute` | PersonAttributeAction.java |

| `role` | RoleAction.java |

| `set/person/name` | PersonAttributeAction.java |

| `set/unit/name` | UnitAttributeAction.java |

| `unit` | UnitAction.java |

| `unitattribute` | UnitAttributeAction.java |

| `unitduty` | UnitDutyAction.java |

| `{flag}` | PersonAction.java |



## x_organization_assemble_personal

*功能：个人中心*

| 接口路径 | Action 文件 |

|---|---|

| `captcha/width/{width}/height/{height}` | RegistAction.java |

| `check/credential/{credential}` | ResetAction.java |

| `check/mobile/{mobile}` | RegistAction.java |

| `check/name/{name}` | RegistAction.java |

| `check/password/{password}` | RegistAction.java, ResetAction.java |

| `code/credential/{credential}` | ResetAction.java |

| `code/mobile/{mobile}` | RegistAction.java |

| `custom` | CustomAction.java |

| `definition` | DefinitionAction.java |

| `empower` | EmpowerAction.java |

| `empowerlog` | EmpowerLogAction.java |

| `exmail` | ExmailAction.java |

| `icon` | IconAction.java, PersonAction.java |

| `icon/mockputtopost` | PersonAction.java |

| `list/currentperson` | EmpowerAction.java |

| `list/currentperson/enable` | EmpowerAction.java |

| `list/currentperson/paging/{page}/size/{size}` | EmpowerLogAction.java |

| `list/person/{flag}` | EmpowerAction.java |

| `list/title/passive` | ExmailAction.java |

| `list/to` | EmpowerAction.java |

| `list/to/currentperson/paging/{page}/size/{size}` | EmpowerLogAction.java |

| `list/to/enable` | EmpowerAction.java |

| `list/{id}/next/{count}` | EmpowerAction.java, EmpowerLogAction.java |

| `list/{id}/prev/{count}` | EmpowerAction.java, EmpowerLogAction.java |

| `manager` | EmpowerAction.java |

| `manager/list/paging/{page}/size/{size}` | EmpowerAction.java, EmpowerLogAction.java |

| `manager/person/{person}/name/{name}` | CustomAction.java |

| `manager/person/{person}/name/{name}/mockputtopost` | CustomAction.java |

| `manager/{id}` | EmpowerAction.java |

| `manager/{id}/mockdeletetoget` | EmpowerAction.java |

| `manager/{id}/mockputtopost` | EmpowerAction.java |

| `mockputtopost` | PasswordAction.java, PersonAction.java, ResetAction.java |

| `mode` | RegistAction.java |

| `new/count` | ExmailAction.java |

| `new/count/passive` | ExmailAction.java |

| `password` | PasswordAction.java, PersonAction.java |

| `password/anonymous` | ResetAction.java |

| `password/mockputtopost` | PersonAction.java |

| `person` | PersonAction.java |

| `regist` | RegistAction.java |

| `reset` | ResetAction.java |

| `sso` | ExmailAction.java |

| `{id}` | EmpowerAction.java, EmpowerLogAction.java |

| `{id}/disable` | EmpowerAction.java |

| `{id}/enable` | EmpowerAction.java |

| `{id}/mockdeletetoget` | EmpowerAction.java, EmpowerLogAction.java |

| `{id}/mockputtopost` | EmpowerAction.java |

| `{name}` | CustomAction.java, DefinitionAction.java |

| `{name}/mockdeletetoget` | CustomAction.java, DefinitionAction.java |

| `{name}/mockputtopost` | CustomAction.java, DefinitionAction.java |

| `{person}` | IconAction.java |



## x_portal_assemble_designer

*功能：门户设计器*

| 接口路径 | Action 文件 |

|---|---|

| `compare` | InputAction.java |

| `cover` | InputAction.java |

| `create` | InputAction.java |

| `designer` | DesignerAction.java |

| `dict` | DictAction.java |

| `file` | FileAction.java |

| `id` | IdAction.java |

| `input` | InputAction.java |

| `list` | OutputAction.java, PortalAction.java, PortalCategoryAction.java, TemplatePageAction.java |

| `list/application/{applicationFlag}` | FileAction.java |

| `list/category` | TemplatePageAction.java |

| `list/manager` | ScriptAction.java |

| `list/page/{pageId}` | PageVersionAction.java |

| `list/paging/{page}/size/{size}` | DictAction.java, ScriptAction.java |

| `list/portal/{portalId}` | DictAction.java, PageAction.java, ScriptAction.java, WidgetAction.java |

| `list/portalcategory/{portalCategory}` | PortalAction.java |

| `list/script/{scriptId}` | ScriptVersionAction.java |

| `list/summary` | PortalAction.java |

| `list/summary/portalcategory/{portalCategory}` | PortalAction.java |

| `list/summary/v2` | PortalAction.java |

| `list/{id}/next/{count}` | FileAction.java |

| `list/{id}/prev/{count}` | FileAction.java |

| `output` | OutputAction.java |

| `page` | PageAction.java |

| `pageversion` | PageVersionAction.java |

| `portal` | PortalAction.java |

| `portalcategory` | PortalCategoryAction.java |

| `prepare/cover` | InputAction.java |

| `prepare/create` | InputAction.java |

| `script` | ScriptAction.java |

| `scriptversion` | ScriptVersionAction.java |

| `search` | DesignerAction.java |

| `templatepage` | TemplatePageAction.java |

| `widget` | WidgetAction.java |

| `{count}` | IdAction.java |

| `{flag}` | FileAction.java |

| `{flag}/select/file` | OutputAction.java |

| `{id}` | DictAction.java, FileAction.java, PageAction.java, PageVersionAction.java, PortalAction.java, ScriptAction.java, ScriptVersionAction.java, TemplatePageAction.java, WidgetAction.java |

| `{id}/download` | FileAction.java |

| `{id}/icon` | PortalAction.java |

| `{id}/permission` | PortalAction.java |

| `{id}/upload` | FileAction.java |

| `{portalFlag}/select` | OutputAction.java |



## x_portal_assemble_surface

*功能：门户展示*

| 接口路径 | Action 文件 |

|---|---|

| `dict` | DictAction.java |

| `file` | FileAction.java |

| `list` | PortalAction.java |

| `list/mobile` | PortalAction.java |

| `list/portal/{portalFlag}` | DictAction.java, FileAction.java |

| `list/portal/{portal}` | PageAction.java, ScriptAction.java, WidgetAction.java |

| `page` | PageAction.java |

| `portal` | PortalAction.java |

| `portal/{portal}/name/{name}` | ScriptAction.java |

| `portal/{portal}/name/{name}/imported` | ScriptAction.java |

| `script` | ScriptAction.java |

| `v2/{flag}/portal/{portalFlag}` | PageAction.java |

| `v2/{flag}/portal/{portalFlag}/mobile` | PageAction.java |

| `v2/{id}` | PageAction.java |

| `v2/{id}/mobile` | PageAction.java |

| `widget` | WidgetAction.java |

| `{dictFlag}/portal/{portalFlag}` | DictAction.java |

| `{dictFlag}/portal/{portalFlag}/data` | DictAction.java |

| `{dictFlag}/portal/{portalFlag}/{path}/data` | DictAction.java |

| `{dictFlag}/portal/{portalFlag}/{path}/data/mockdeletetoget` | DictAction.java |

| `{dictFlag}/portal/{portalFlag}/{path}/data/mockputtopost` | DictAction.java |

| `{flag}` | FileAction.java, PortalAction.java |

| `{flag}/corner/mark` | PortalAction.java |

| `{flag}/download` | FileAction.java |

| `{flag}/portal/{portalFlag}` | PageAction.java, WidgetAction.java |

| `{flag}/portal/{portalFlag}/content` | FileAction.java |

| `{flag}/portal/{portalFlag}/download` | FileAction.java |

| `{flag}/portal/{portalFlag}/mobile` | PageAction.java, WidgetAction.java |

| `{id}` | PageAction.java, ScriptAction.java, WidgetAction.java |

| `{id}/icon` | PortalAction.java |

| `{id}/icon/base64` | PortalAction.java |

| `{id}/mobile` | PageAction.java, WidgetAction.java |



## x_processplatform_assemble_bam

*功能：流程统计*

| 接口路径 | Action 文件 |

|---|---|

| `applicationtstubs/trigger` | StateAction.java |

| `category` | StateAction.java |

| `category/trigger` | StateAction.java |

| `list/completed/task/applicationstubs` | PeriodAction.java |

| `list/completed/task/unitstubs` | PeriodAction.java |

| `list/completed/work/applicationstubs` | PeriodAction.java |

| `list/completed/work/unitstubs` | PeriodAction.java |

| `list/count/completed/task/application/{applicationId}/process/{processId}/activity/{activityId}/by/unit` | PeriodAction.java |

| `list/count/completed/task/application/{applicationId}/process/{processId}/activity/{activityId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/completed/task/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}/by/activity` | PeriodAction.java |

| `list/count/completed/task/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/completed/task/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/count/completed/work/application/{applicationId}/process/{processId}/by/unit` | PeriodAction.java |

| `list/count/completed/work/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/completed/work/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/completed/work/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/count/expired/task/application/{applicationId}/process/{processId}/activity/{activityId}/by/unit` | PeriodAction.java |

| `list/count/expired/task/application/{applicationId}/process/{processId}/activity/{activityId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/expired/task/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}/by/activity` | PeriodAction.java |

| `list/count/expired/task/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/expired/task/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/count/expired/work/application/{applicationId}/process/{processId}/by/unit` | PeriodAction.java |

| `list/count/expired/work/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/expired/work/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/expired/work/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/count/start/task/application/{applicationId}/process/{processId}/activity/{activityId}/by/unit` | PeriodAction.java |

| `list/count/start/task/application/{applicationId}/process/{processId}/activity/{activityId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/start/task/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}/by/activity` | PeriodAction.java |

| `list/count/start/task/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/start/task/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/count/start/work/application/{applicationId}/process/{processId}/by/unit` | PeriodAction.java |

| `list/count/start/work/application/{applicationId}/process/{processId}/unit/{unit}/person/{person}` | PeriodAction.java |

| `list/count/start/work/application/{applicationId}/unit/{unit}/person/{person}/by/process` | PeriodAction.java |

| `list/count/start/work/unit/{unit}/person/{person}/by/application` | PeriodAction.java |

| `list/expired/task/applicationstubs` | PeriodAction.java |

| `list/expired/task/unitstubs` | PeriodAction.java |

| `list/expired/work/applicationstubs` | PeriodAction.java |

| `list/expired/work/unitstubs` | PeriodAction.java |

| `list/start/task/applicationstubs` | PeriodAction.java |

| `list/start/task/unitstubs` | PeriodAction.java |

| `list/start/work/applicationstubs` | PeriodAction.java |

| `list/start/work/unitstubs` | PeriodAction.java |

| `organization` | StateAction.java |

| `period` | PeriodAction.java |

| `running` | StateAction.java |

| `state` | StateAction.java |

| `summary` | StateAction.java |



## x_processplatform_assemble_designer

*功能：流程设计器*

| 接口路径 | Action 文件 |

|---|---|

| `activity/{flag}/activityType/{activityType}` | ProcessAction.java |

| `application` | ApplicationAction.java |

| `application/{applicationFlag}/merge/data` | WorkCompletedAction.java |

| `application/{applicationId}` | ProcessAction.java, ScriptAction.java |

| `application/{applicationId}/disable/edition` | ProcessAction.java |

| `application/{applicationId}/edition/{edition}` | ProcessAction.java |

| `application/{applicationId}/name/{name}` | ScriptAction.java |

| `applicationcategory` | ApplicationCategoryAction.java |

| `applicationdict` | ApplicationDictAction.java |

| `applicationdict/orphan` | ElementToolAction.java |

| `bach/save` | ItemAccessAction.java |

| `compare` | InputAction.java |

| `cover` | InputAction.java |

| `create` | InputAction.java |

| `delete/process/{processId}/path/{path}` | ItemAccessAction.java |

| `designer` | DesignerAction.java |

| `elementtool` | ElementToolAction.java |

| `estimate` | MergeItemPlanAction.java |

| `file` | FileAction.java |

| `form` | FormAction.java |

| `form/orphan` | ElementToolAction.java |

| `form/{formId}` | ProcessAction.java |

| `formversion` | FormVersionAction.java |

| `id` | IdAction.java |

| `input` | InputAction.java |

| `item-access` | ItemAccessAction.java |

| `list` | ApplicationAction.java, ApplicationCategoryAction.java, OutputAction.java, TemplateFormAction.java |

| `list/application/{applicationFlag}` | FileAction.java, MappingAction.java |

| `list/application/{applicationId}` | ApplicationDictAction.java, FormAction.java |

| `list/application/{applicationId}/paging/{page}/size/{size}` | MergeItemPlanAction.java |

| `list/applicationcategory/{applicationCategory}` | ApplicationAction.java |

| `list/category` | TemplateFormAction.java |

| `list/form/{formId}` | FormVersionAction.java |

| `list/formfield/application/{applicationId}` | FormAction.java |

| `list/manager` | ScriptAction.java |

| `list/paging/{page}/size/{size}` | ApplicationDictAction.java, MergeItemPlanAction.java, ScriptAction.java |

| `list/process/{processId}` | ProcessVersionAction.java |

| `list/script/{scriptId}` | ScriptVersionAction.java |

| `list/summary` | ApplicationAction.java |

| `list/summary/applicationcategory/{applicationCategory}` | ApplicationAction.java |

| `list/{id}/formfield` | FormAction.java |

| `list/{id}/next/{count}` | FileAction.java, FormAction.java, MappingAction.java, ScriptAction.java |

| `list/{id}/prev/{count}` | FileAction.java, FormAction.java, MappingAction.java, ScriptAction.java |

| `mapping` | MappingAction.java |

| `mergeitemplan` | MergeItemPlanAction.java |

| `output` | OutputAction.java |

| `path/{path}` | ItemAccessAction.java |

| `prepare/cover` | InputAction.java |

| `prepare/create` | InputAction.java |

| `process` | ProcessAction.java |

| `process/orphan` | ElementToolAction.java |

| `process/{processFlag}/merge/data` | WorkCompletedAction.java |

| `process/{processId}` | ItemAccessAction.java |

| `process/{processId}/path/{path}` | ItemAccessAction.java |

| `processversion` | ProcessVersionAction.java |

| `route/{id}` | DesignerAction.java |

| `script` | ScriptAction.java |

| `script/orphan` | ElementToolAction.java |

| `scriptversion` | ScriptVersionAction.java |

| `search` | DesignerAction.java |

| `templateform` | TemplateFormAction.java |

| `upgrade/all` | ProcessAction.java |

| `workcompleted` | WorkCompletedAction.java |

| `{applicationFlag}/select` | OutputAction.java |

| `{count}` | IdAction.java |

| `{flag}` | FileAction.java, MappingAction.java |

| `{flag}/application/{applicationFlag}` | FileAction.java |

| `{flag}/execute` | MappingAction.java |

| `{id}` | ApplicationAction.java, ApplicationDictAction.java, FileAction.java, FormAction.java, FormVersionAction.java, ItemAccessAction.java, MergeItemPlanAction.java, ProcessAction.java, ProcessVersionAction.java, ScriptAction.java, ScriptVersionAction.java, TemplateFormAction.java |

| `{id}/content` | FileAction.java |

| `{id}/disable` | ProcessAction.java |

| `{id}/download` | FileAction.java |

| `{id}/enable` | ProcessAction.java |

| `{id}/enabled` | ProcessAction.java |

| `{id}/execute/projection` | ProcessAction.java |

| `{id}/icon` | ApplicationAction.java |

| `{id}/lead/out` | ProcessAction.java |

| `{id}/list/element` | ProcessAction.java |

| `{id}/permission` | ApplicationAction.java, ProcessAction.java |

| `{id}/process` | ProcessAction.java |

| `{id}/upgrade` | ProcessAction.java |

| `{id}/upload` | FileAction.java |

| `{id}/{onlyRemoveNotCompleted}` | ApplicationAction.java, ProcessAction.java |

| `{id}/{onlyRemoveNotCompleted}/edition` | ProcessAction.java |



## x_processplatform_assemble_surface

*功能：流程待办/已办*

| 接口路径 | Action 文件 |

|---|---|

| `/openapi` | OpenApiAction.java |

| `activity/{activity}/activityType/{activityType}` | ProcessAction.java |

| `anonymous` | AnonymousAction.java |

| `application` | ApplicationAction.java |

| `application/{applicationFlag}/process/{processFlag}` | WorkAction.java |

| `application/{applicationFlag}/process/{processFlag}/force` | WorkAction.java |

| `applicationdict` | ApplicationDictAction.java |

| `attachment` | AttachmentAction.java |

| `batch/delete/manage` | AttachmentAction.java |

| `batch/download/job/{job}/site/{site}` | AttachmentAction.java |

| `batch/download/work/{workId}/site/{site}` | AttachmentAction.java |

| `batch/download/work/{workId}/site/{site}/stream` | AttachmentAction.java |

| `batch/update/manage` | AttachmentAction.java |

| `batch/upload/manage` | AttachmentAction.java |

| `clear/person/{person}/manager` | TaskProcessModeAction.java |

| `control` | ControlAction.java |

| `copy/work/{workId}` | AttachmentAction.java |

| `copy/work/{workId}/soft` | AttachmentAction.java |

| `copy/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `copy/workcompleted/{workCompletedId}/soft` | AttachmentAction.java |

| `correlation` | CorrelationAction.java |

| `count/application` | ReviewAction.java |

| `count/filter` | ReadAction.java, TaskAction.java |

| `count/person/{credential}` | ReviewAction.java |

| `count/{credential}` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `count/{credential}/application/{appId}` | WorkAction.java |

| `create/work` | ReviewAction.java |

| `create/workcompleted` | ReviewAction.java |

| `data` | DataAction.java |

| `datarecord` | DataRecordAction.java |

| `doc/to/word/work/{workId}` | AttachmentAction.java |

| `doc/to/word/workorworkcompleted/{workOrWorkCompleted}` | AttachmentAction.java |

| `documentversion` | DocumentVersionAction.java |

| `download/invoice/{id}/jobOrWorkOrWorkCompleted/{jobOrWorkOrWorkCompleted}` | AttachmentAction.java |

| `download/transfer/flag/{flag}` | AttachmentAction.java |

| `download/work/{workId}/att/{flag}` | AttachmentAction.java |

| `download/{id}` | AttachmentAction.java |

| `download/{id}/manage` | AttachmentAction.java |

| `download/{id}/manage/stream` | AttachmentAction.java |

| `download/{id}/stream` | AttachmentAction.java |

| `download/{id}/work/{workId}` | AttachmentAction.java |

| `download/{id}/work/{workId}/stream` | AttachmentAction.java |

| `download/{id}/work/{workId}/stream/{fileName}.{extension}` | AttachmentAction.java |

| `download/{id}/work/{workId}/{fileName}.{extension}` | AttachmentAction.java |

| `download/{id}/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `download/{id}/workcompleted/{workCompletedId}/stream` | AttachmentAction.java |

| `download/{id}/workcompleted/{workCompletedId}/stream/{fileName}.{extension}` | AttachmentAction.java |

| `download/{id}/workcompleted/{workCompletedId}/{fileName}.{extension}` | AttachmentAction.java |

| `download/{scrawlId}` | SignAction.java |

| `draft` | DraftAction.java |

| `edit/{id}/work/{workId}` | AttachmentAction.java |

| `edit/{id}/work/{workId}/mockputtopost` | AttachmentAction.java |

| `edit/{id}/work/{workId}/text` | AttachmentAction.java |

| `edit/{id}/work/{workId}/text/mockputtopost` | AttachmentAction.java |

| `expire` | TouchAction.java |

| `fetch/job/{job}` | DataAction.java |

| `file` | FileAction.java |

| `filter/attribute` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java |

| `filter/attribute/application/{applicationFlag}` | WorkAction.java, WorkCompletedAction.java |

| `filter/attribute/application/{applicationFlag}/manage` | WorkAction.java, WorkCompletedAction.java |

| `filter/attribute/filter` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `filter/create/entry` | ReviewAction.java |

| `filter/entry` | ReviewAction.java |

| `filter/list/{id}/prev/{count}/application/{applicationFlag}` | WorkCompletedAction.java |

| `form` | FormAction.java |

| `get/job/{job}/path/{path}` | DataRecordAction.java |

| `handover` | HandoverAction.java |

| `html/to/image` | AttachmentAction.java |

| `html/to/pdf` | AttachmentAction.java |

| `invoice/{id}/jobOrWorkOrWorkCompleted/{jobOrWorkOrWorkCompleted}` | AttachmentAction.java |

| `job` | JobAction.java |

| `job/{job}` | CorrelationAction.java, DataAction.java |

| `job/{job}/array/data` | DataAction.java |

| `job/{job}/delete` | CorrelationAction.java |

| `job/{job}/manage` | RecordAction.java |

| `job/{job}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}` | DataAction.java |

| `job/{job}/{path0}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}` | DataAction.java |

| `job/{job}/{path0}/{path1}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockputtopost` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}` | DataAction.java |

| `job/{job}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockputtopost` | DataAction.java |

| `keylock` | KeyLockAction.java |

| `latest/work/workcompleted/serial/{serial}` | JobAction.java |

| `list` | ApplicationAction.java, RouteAction.java, TaskProcessModeAction.java |

| `list/add/split/work/{workId}` | WorkLogAction.java |

| `list/application/{applicationFlag}` | ApplicationDictAction.java, FileAction.java, ProcessAction.java, SerialNumberAction.java |

| `list/application/{applicationFlag}/filter` | ProcessAction.java |

| `list/available/identity/process/{flag}` | ProcessAction.java |

| `list/complex` | ApplicationAction.java |

| `list/complex/manage/{person}` | ApplicationAction.java |

| `list/controllable/application/{applicationFlag}` | ProcessAction.java |

| `list/count/application` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/count/application/{applicationFlag}/process` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/count/application/{applicationFlag}/process/manage` | WorkAction.java, WorkCompletedAction.java |

| `list/date/{date}/hour/{hour}/exclude/draft/{isExcludeDraft}/manage` | TaskAction.java |

| `list/date/{date}/hour/{hour}/manage` | TaskCompletedAction.java |

| `list/date/{date}/manage` | ReadAction.java, ReadCompletedAction.java |

| `list/filter/{page}/size/{size}/manage` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/ids` | ProcessAction.java |

| `list/job/{job}` | AttachmentAction.java, CorrelationAction.java, DataRecordAction.java, DocumentVersionAction.java, ReadAction.java, ReadCompletedAction.java, ReadRecordAction.java, RecordAction.java, ReviewAction.java, SignAction.java, TaskAction.java, TaskCompletedAction.java, WorkLogAction.java |

| `list/job/{job}/category/{category}` | DocumentVersionAction.java |

| `list/job/{job}/paging/{page}/size/{size}` | RecordAction.java |

| `list/job/{job}/site/{site}` | CorrelationAction.java |

| `list/key/{key}` | ApplicationAction.java |

| `list/mockputtopost` | RouteAction.java |

| `list/my/filter/{page}/size/{size}` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/my/paging/{page}/size/{size}` | DraftAction.java, ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `list/paging/{page}/size/{size}` | HandoverAction.java |

| `list/paging/{page}/size/{size}/application/{applicationFlag}/filter/manage` | SnapAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/person/{person}/exclude/draft/{isExcludeDraft}/manage` | TaskAction.java |

| `list/person/{person}/manage` | ReadAction.java |

| `list/prev/manual/{flag}` | TaskCompletedAction.java |

| `list/range` | ApplicationAction.java |

| `list/rollback/workorworkcompleted/{workOrWorkCompleted}` | WorkLogAction.java |

| `list/terminal/{terminal}` | ApplicationAction.java |

| `list/work/{workId}` | AttachmentAction.java |

| `list/work/{work}` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `list/workorworkcompleted/{workOrWorkCompleted}` | AttachmentAction.java, DocumentVersionAction.java, ReadAction.java, ReadCompletedAction.java, ReadRecordAction.java, RecordAction.java, TaskCompletedAction.java, WorkLogAction.java |

| `list/workorworkcompleted/{workOrWorkCompleted}/category/{category}` | DocumentVersionAction.java |

| `list/workorworkcompleted/{workOrWorkCompleted}/paging/{page}/size/{size}` | RecordAction.java |

| `list/{id}/next/{count}` | DraftAction.java, ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/{id}/next/{count}/application/{applicationFlag}` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/{id}/next/{count}/application/{applicationFlag}/filter` | WorkAction.java, WorkCompletedAction.java |

| `list/{id}/next/{count}/application/{applicationFlag}/filter/manage` | WorkAction.java, WorkCompletedAction.java |

| `list/{id}/next/{count}/application/{applicationFlag}/manage` | WorkAction.java, WorkCompletedAction.java |

| `list/{id}/next/{count}/creator/current` | WorkAction.java |

| `list/{id}/next/{count}/creator/current/filter` | WorkAction.java |

| `list/{id}/next/{count}/filter` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/{id}/next/{count}/filter/manage` | SnapAction.java, TaskAction.java |

| `list/{id}/next/{count}/manage` | SnapAction.java, TaskAction.java |

| `list/{id}/next/{count}/process/{processFlag}` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `list/{id}/prev/{count}` | DraftAction.java, ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/{id}/prev/{count}/application/{applicationFlag}` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `list/{id}/prev/{count}/application/{applicationFlag}/filter` | WorkAction.java, WorkCompletedAction.java |

| `list/{id}/prev/{count}/application/{applicationFlag}/filter/manage` | WorkAction.java |

| `list/{id}/prev/{count}/application/{applicationFlag}/manage` | WorkAction.java, WorkCompletedAction.java |

| `list/{id}/prev/{count}/creator/current` | WorkAction.java |

| `list/{id}/prev/{count}/creator/current/filter` | WorkAction.java |

| `list/{id}/prev/{count}/filter` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `list/{id}/prev/{count}/filter/manage` | SnapAction.java, TaskAction.java |

| `list/{id}/prev/{count}/manage` | SnapAction.java, TaskAction.java |

| `list/{id}/prev/{count}/process/{processFlag}` | ReadAction.java, ReadCompletedAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `lock` | KeyLockAction.java |

| `lock/mockputtopost` | KeyLockAction.java |

| `mockputtopost` | DraftAction.java |

| `mode` | TaskProcessModeAction.java |

| `passexpired` | TouchAction.java |

| `press/work/{work}` | TaskCompletedAction.java |

| `preview/image/{flag}/result` | AttachmentAction.java |

| `preview/pdf/{flag}/result` | AttachmentAction.java |

| `process` | ProcessAction.java |

| `process/{processFlag}` | DraftAction.java, WorkAction.java, WorkCompletedAction.java |

| `process/{processFlag}/force` | WorkAction.java |

| `read` | ReadAction.java |

| `read/count/{credential}` | AnonymousAction.java |

| `readcompleted` | ReadCompletedAction.java |

| `readrecord` | ReadRecordAction.java |

| `record` | RecordAction.java |

| `review` | ReviewAction.java |

| `route` | RouteAction.java |

| `save` | TaskProcessModeAction.java |

| `save/task/{taskId}` | SignAction.java |

| `script` | ScriptAction.java |

| `serialnumber` | SerialNumberAction.java |

| `service` | ServiceAction.java |

| `shift/time` | WorkCompletedAction.java |

| `sign` | SignAction.java |

| `snap` | SnapAction.java |

| `task` | TaskAction.java |

| `task/count/{credential}` | AnonymousAction.java |

| `task/{taskId}` | SignAction.java |

| `task/{taskId}/mockdeletetoget` | SignAction.java |

| `taskcompleted` | TaskCompletedAction.java |

| `touch` | TouchAction.java |

| `touchdetained` | TouchAction.java |

| `update/content/{id}/work/{workId}` | AttachmentAction.java |

| `update/content/{id}/work/{workId}/mockputtopost` | AttachmentAction.java |

| `update/job/{job}` | CorrelationAction.java |

| `update/{id}/work/{workId}` | AttachmentAction.java |

| `update/{id}/work/{workId}/callback/{callback}` | AttachmentAction.java |

| `update/{id}/work/{workId}/mockputtopost` | AttachmentAction.java |

| `upload` | SnapAction.java |

| `upload/with/url` | AttachmentAction.java |

| `upload/work/{workId}` | AttachmentAction.java |

| `upload/work/{workId}/callback/{callback}` | AttachmentAction.java |

| `upload/work/{workId}/save/as/{flag}` | AttachmentAction.java |

| `upload/work/{workId}/save/as/{flag}/mockputtopost` | AttachmentAction.java |

| `upload/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `v2/count` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java |

| `v2/list` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `v2/list/create/paging/{page}/size/{size}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java |

| `v2/list/create/{id}/next/{count}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java |

| `v2/list/create/{id}/prev/{count}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java |

| `v2/list/paging/{page}/size/{size}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `v2/list/paging/{page}/size/{size}/manage` | ReviewAction.java |

| `v2/list/{id}/activity/goback` | WorkAction.java |

| `v2/list/{id}/next/{count}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `v2/list/{id}/prev/{count}` | ReadAction.java, ReadCompletedAction.java, ReviewAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `v2/lookup/taskcompleted/{taskcompleted}` | FormAction.java |

| `v2/lookup/taskcompleted/{taskcompleted}/mobile` | FormAction.java |

| `v2/lookup/workorworkcompleted/{workOrWorkCompleted}` | FormAction.java |

| `v2/lookup/workorworkcompleted/{workOrWorkCompleted}/mobile` | FormAction.java |

| `v2/search` | ReviewAction.java |

| `v2/upload/workorworkcompleted/{workOrWorkCompleted}` | AttachmentAction.java |

| `v2/upload/workorworkcompleted/{workOrWorkCompleted}/base64` | AttachmentAction.java |

| `v2/workorworkcompleted/{workOrWorkCompleted}` | WorkAction.java |

| `v2/{id}` | FormAction.java |

| `v2/{id}/add` | TaskAction.java |

| `v2/{id}/add/split` | WorkAction.java |

| `v2/{id}/add/split/mockputtopost` | WorkAction.java |

| `v2/{id}/mobile` | FormAction.java |

| `v2/{id}/pause` | TaskAction.java |

| `v2/{id}/reroute` | WorkAction.java |

| `v2/{id}/reroute/mockputtopost` | WorkAction.java |

| `v2/{id}/reset` | TaskAction.java |

| `v2/{id}/reset/mockputtopost` | TaskAction.java |

| `v2/{id}/resume` | TaskAction.java |

| `v2/{id}/retract` | WorkAction.java |

| `v2/{id}/retract/mockputtopost` | WorkAction.java |

| `v2/{id}/rollback` | WorkAction.java |

| `v2/{id}/rollback/mockputtopost` | WorkAction.java |

| `v2/{id}/terminate` | WorkAction.java |

| `v2/{id}/terminate/manage` | WorkAction.java |

| `v2/{id}/trigger/processing` | TaskAction.java, WorkAction.java |

| `v2/{job}/projection` | JobAction.java |

| `v3/retract` | WorkAction.java |

| `v3/retract/stage/job/{job}` | WorkAction.java |

| `v3/workorworkcompleted/{workOrWorkCompleted}/permission` | WorkAction.java |

| `v3/{id}/add` | TaskAction.java |

| `v3/{id}/pin` | TaskAction.java |

| `work` | WorkAction.java |

| `work/{id}` | DataAction.java |

| `work/{id}/mockdeletetoget` | DataAction.java |

| `work/{id}/mockputtopost` | DataAction.java |

| `work/{id}/touch` | ServiceAction.java |

| `work/{id}/touch/mockputtopost` | ServiceAction.java |

| `work/{id}/{path0}` | DataAction.java |

| `work/{id}/{path0}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}` | DataAction.java |

| `work/{id}/{path0}/{path1}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockputtopost` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockdeletetoget` | DataAction.java |

| `work/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockputtopost` | DataAction.java |

| `work/{workId}` | ReadAction.java |

| `work/{workId}/type/abandoned` | SnapAction.java |

| `work/{workId}/type/snap` | SnapAction.java |

| `work/{workId}/type/suspend` | SnapAction.java |

| `work/{work}` | DocumentVersionAction.java |

| `workcompleted` | WorkCompletedAction.java |

| `workcompleted/{id}` | DataAction.java |

| `workcompleted/{id}/from/data` | DataAction.java |

| `workcompleted/{id}/from/item` | DataAction.java |

| `workcompleted/{id}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}` | DataAction.java |

| `workcompleted/{id}/{path0}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/mockputtopost` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}` | DataAction.java |

| `workcompleted/{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/mockputtopost` | DataAction.java |

| `workcompleted/{workCompletedId}` | ReadAction.java |

| `workcompleted/{workCompletedId}/type/abandonedworkcompleted` | SnapAction.java |

| `workcompleted/{workCompletedId}/type/snapworkcompleted` | SnapAction.java |

| `worklog` | WorkLogAction.java |

| `workorworkcompleted/{workOrWorkCompleted}` | ControlAction.java, ReviewAction.java, WorkAction.java |

| `{applicationDictFlag}/application/{applicationFlag}` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data/mockputtopost` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data/mockdeletetoget` | ApplicationDictAction.java |

| `{applicationDictFlag}/application/{applicationFlag}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data/mockputtopost` | ApplicationDictAction.java |

| `{flag}` | ApplicationAction.java, FormAction.java, ProcessAction.java |

| `{flag}/allowrerouteto` | ProcessAction.java |

| `{flag}/application/{applicationFlag}` | FormAction.java, ProcessAction.java, ScriptAction.java |

| `{flag}/application/{applicationFlag}/content` | FileAction.java |

| `{flag}/application/{applicationFlag}/download` | FileAction.java |

| `{flag}/application/{applicationFlag}/imported` | ScriptAction.java |

| `{flag}/application/{applicationFlag}/mobile` | FormAction.java |

| `{flag}/complex` | ProcessAction.java |

| `{flag}/icon` | ApplicationAction.java |

| `{flag}/is/manager` | ApplicationAction.java |

| `{flag}/mobile` | FormAction.java |

| `{flag}/rollback` | WorkCompletedAction.java |

| `{flag}/rollback/mockputtopost` | WorkCompletedAction.java |

| `{flag}/{onlyRemoveNotCompleted}` | ApplicationAction.java, ProcessAction.java |

| `{id}` | AttachmentAction.java, DocumentVersionAction.java, DraftAction.java, HandoverAction.java, ReadAction.java, ReadCompletedAction.java, ReviewAction.java, RouteAction.java, SerialNumberAction.java, SignAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `{id}/add` | TaskAction.java |

| `{id}/add/split` | WorkAction.java |

| `{id}/add/split/mockputtopost` | WorkAction.java |

| `{id}/application/{applicationFlag}/manage` | ReviewAction.java |

| `{id}/application/{applicationFlag}/manage/mockdeletetoget` | ReviewAction.java |

| `{id}/assignment/manage` | WorkAction.java, WorkCompletedAction.java |

| `{id}/available` | AttachmentAction.java |

| `{id}/cancel` | HandoverAction.java |

| `{id}/close/check` | WorkAction.java |

| `{id}/delete` | TaskProcessModeAction.java |

| `{id}/delete/manage` | WorkCompletedAction.java |

| `{id}/delete/manage/mockdeletetoget` | WorkCompletedAction.java |

| `{id}/download` | SnapAction.java |

| `{id}/manage` | ReadAction.java, ReadCompletedAction.java, RecordAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java, WorkCompletedAction.java |

| `{id}/manage/mockdeletetoget` | ReadAction.java, ReadCompletedAction.java, RecordAction.java, TaskAction.java, TaskCompletedAction.java |

| `{id}/manage/mockputtopost` | RecordAction.java |

| `{id}/mockdeletetoget` | AttachmentAction.java, DraftAction.java, SerialNumberAction.java, SignAction.java, SnapAction.java, WorkAction.java |

| `{id}/mockputtopost` | ReadAction.java, SerialNumberAction.java, TaskAction.java |

| `{id}/online/info` | AttachmentAction.java |

| `{id}/opinion/manage` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `{id}/opinion/manage/mockputtopost` | ReadAction.java, TaskAction.java, TaskCompletedAction.java |

| `{id}/press/manage` | TaskAction.java |

| `{id}/preview/image/page/{page}` | AttachmentAction.java |

| `{id}/preview/pdf` | AttachmentAction.java |

| `{id}/process` | HandoverAction.java |

| `{id}/processing` | ReadAction.java, TaskAction.java, WorkAction.java |

| `{id}/processing/manage` | ReadAction.java, TaskAction.java |

| `{id}/processing/manage/mockputtopost` | ReadAction.java, TaskAction.java |

| `{id}/processing/mockputtopost` | WorkAction.java |

| `{id}/processing/neural` | TaskAction.java |

| `{id}/projection` | WorkAction.java |

| `{id}/refer` | WorkAction.java |

| `{id}/reference` | ReadAction.java, ReadCompletedAction.java, TaskAction.java, TaskCompletedAction.java |

| `{id}/reference/control` | TaskCompletedAction.java |

| `{id}/relative/manage` | WorkAction.java |

| `{id}/relative/manage/mockdeletetoget` | WorkAction.java |

| `{id}/reroute/activity/{activityId}/activitytype/{activityType}` | WorkAction.java |

| `{id}/reroute/activity/{activityId}/activitytype/{activityType}/mockputtopost` | WorkAction.java |

| `{id}/reset/manage` | ReadAction.java, TaskAction.java |

| `{id}/reset/manage/mockputtopost` | ReadAction.java, TaskAction.java |

| `{id}/restore` | SnapAction.java |

| `{id}/retract` | WorkAction.java |

| `{id}/retract/mockputtopost` | WorkAction.java |

| `{id}/rollback` | WorkAction.java |

| `{id}/rollback/mockputtopost` | WorkAction.java |

| `{id}/selectconfig` | RouteAction.java |

| `{id}/single/manage` | WorkAction.java |

| `{id}/single/manage/mockdeletetoget` | WorkAction.java |

| `{id}/start` | DraftAction.java |

| `{id}/will` | TaskAction.java |

| `{id}/work/{workId}` | AttachmentAction.java |

| `{id}/work/{workId}/change/site/{site}` | AttachmentAction.java |

| `{id}/work/{workId}/mockdeletetoget` | AttachmentAction.java |

| `{id}/work/{workId}/text` | AttachmentAction.java |

| `{id}/work/{workOrWorkCompleted}/change/ordernumber/{orderNumber}` | AttachmentAction.java |

| `{id}/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `{id}/workcompleted/{workCompletedId}/mockdeletetoget` | AttachmentAction.java |

| `{id}/workorworkcompleted/{workOrWorkCompleted}` | AttachmentAction.java |

| `{job}/allow/visit/person/{person}` | JobAction.java |

| `{job}/find/work/workcompleted` | JobAction.java |



## x_processplatform_service_processing

*功能：流程处理服务*

| 接口路径 | Action 文件 |

|---|---|

| `add/update/table` | EventAction.java |

| `applicationdict` | ApplicationDictAction.java |

| `attachment` | AttachmentAction.java |

| `cleanevent` | TouchAction.java |

| `copy/work/{workId}` | AttachmentAction.java |

| `copy/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `create/work` | ReviewAction.java |

| `create/workcompleted` | ReviewAction.java |

| `data` | DataAction.java |

| `deletedraft` | TouchAction.java |

| `documentversion` | DocumentVersionAction.java |

| `edit/{id}/text` | AttachmentAction.java |

| `event` | EventAction.java |

| `form` | FormAction.java |

| `handoverjob` | TouchAction.java |

| `job` | JobAction.java |

| `job/{job}` | DataAction.java, RecordAction.java |

| `job/{job}/{path}` | DataAction.java |

| `loglongdetained` | TouchAction.java |

| `manual/after/processing` | WorkAction.java |

| `merge` | TouchAction.java |

| `mergeitem` | TouchAction.java |

| `next/task/identity` | TaskCompletedAction.java |

| `process/{processFlag}` | WorkCompletedAction.java |

| `process/{processId}` | WorkAction.java |

| `process/{processId}/name/{name}/serial` | WorkAction.java |

| `read` | ReadAction.java |

| `readcompleted` | ReadCompletedAction.java |

| `record` | RecordAction.java |

| `review` | ReviewAction.java |

| `service` | ServiceAction.java |

| `shift/time` | WorkCompletedAction.java |

| `snap` | SnapAction.java |

| `suitable/activity/{activityId}` | FormAction.java |

| `task` | TaskAction.java |

| `task/processing` | RecordAction.java |

| `taskcompleted` | TaskCompletedAction.java |

| `touch` | TouchAction.java |

| `touchdelay` | TouchAction.java |

| `upload` | SnapAction.java |

| `urge` | TouchAction.java |

| `v2/{id}` | TaskAction.java |

| `v2/{id}/add/manual/task/identity/matrix` | WorkAction.java |

| `v2/{id}/add/split` | WorkAction.java |

| `v2/{id}/goback` | WorkAction.java |

| `v2/{id}/pause` | TaskAction.java |

| `v2/{id}/remove` | TaskAction.java |

| `v2/{id}/reroute` | WorkAction.java |

| `v2/{id}/reset` | TaskAction.java |

| `v2/{id}/resume` | TaskAction.java |

| `v2/{id}/retract` | WorkAction.java |

| `v2/{id}/rollback` | WorkAction.java |

| `v2/{id}/terminate` | WorkAction.java |

| `v2/{job}/person/{person}/view` | JobAction.java |

| `v2/{job}/projection` | JobAction.java |

| `v3/retract` | WorkAction.java |

| `v3/{id}/add` | TaskAction.java |

| `work` | WorkAction.java |

| `work/processing` | RecordAction.java |

| `work/terminate` | RecordAction.java |

| `work/{id}` | DataAction.java |

| `work/{id}/delete` | DataAction.java |

| `work/{id}/touch` | ServiceAction.java |

| `work/{id}/{path}` | DataAction.java |

| `work/{id}/{path}/delete` | DataAction.java |

| `work/{workId}` | ReadAction.java |

| `work/{workId}/type/abandoned` | SnapAction.java |

| `work/{workId}/type/snap` | SnapAction.java |

| `work/{workId}/type/suspend` | SnapAction.java |

| `work/{work}` | DocumentVersionAction.java |

| `workcompleted` | WorkCompletedAction.java |

| `workcompleted/{id}` | DataAction.java |

| `workcompleted/{id}/{path}` | DataAction.java |

| `workcompleted/{workCompletedId}` | ReadAction.java |

| `workcompleted/{workCompletedId}/type/abandonedworkcompleted` | SnapAction.java |

| `workcompleted/{workCompletedId}/type/snapworkcompleted` | SnapAction.java |

| `{flag}/merge` | WorkCompletedAction.java |

| `{flag}/rollback` | WorkCompletedAction.java |

| `{id}` | ApplicationDictAction.java, AttachmentAction.java, ReadAction.java, ReadCompletedAction.java, RecordAction.java, ReviewAction.java, SnapAction.java, TaskAction.java, TaskCompletedAction.java, WorkAction.java |

| `{id}/add` | TaskAction.java |

| `{id}/add/split` | WorkAction.java |

| `{id}/draft` | WorkAction.java |

| `{id}/expire` | TaskAction.java |

| `{id}/manual/append/identity` | WorkAction.java |

| `{id}/pass/expired` | TaskAction.java |

| `{id}/press` | TaskAction.java |

| `{id}/press/work/{work}` | TaskCompletedAction.java |

| `{id}/processing` | ReadAction.java, TaskAction.java, WorkAction.java |

| `{id}/projection` | WorkAction.java |

| `{id}/replace` | ReadAction.java, TaskAction.java |

| `{id}/reroute/activity/{activityId}/activitytype/{activityType}` | WorkAction.java |

| `{id}/reset` | ReadAction.java |

| `{id}/restore` | SnapAction.java |

| `{id}/rollback` | WorkAction.java |

| `{id}/series/{series}/activitytoken/{activityToken}/processing/signal` | WorkAction.java |

| `{id}/urge` | TaskAction.java |

| `{id}/will` | TaskAction.java |

| `{id}/work/{workId}` | AttachmentAction.java |

| `{id}/workcompleted/{workCompletedId}` | AttachmentAction.java |

| `{id}/{path0}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/{path3}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/{path3}/{path4}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/data` | ApplicationDictAction.java |

| `{id}/{path0}/{path1}/{path2}/{path3}/{path4}/{path5}/{path6}/{path7}/data` | ApplicationDictAction.java |

| `{job}` | JobAction.java |



## x_query_assemble_designer

*功能：数据查询设计器*

| 接口路径 | Action 文件 |

|---|---|

| `compare` | InputAction.java |

| `cover` | InputAction.java |

| `create` | InputAction.java |

| `designer` | DesignerAction.java |

| `entity/{entity}/category/{entityCategory}/properties` | QueryAction.java |

| `export/{tableFlag}/count/{count}` | TableAction.java |

| `generate/model/{modelFlag}` | NeuralAction.java |

| `id` | IdAction.java |

| `importmodel` | ImportModelAction.java |

| `input` | InputAction.java |

| `learn/model/{modelFlag}` | NeuralAction.java |

| `list` | OutputAction.java |

| `list/all` | QueryAction.java |

| `list/manage` | StatementAction.java, TableAction.java |

| `list/model` | NeuralAction.java |

| `list/query/{flag}` | ImportModelAction.java, StatAction.java, StatementAction.java, TableAction.java, ViewAction.java |

| `list/querycategory/{queryCategory}` | QueryAction.java |

| `list/summary` | QueryAction.java |

| `list/summary/querycategory/{queryCategory}` | QueryAction.java |

| `list/{id}/next/{count}` | StatAction.java, ViewAction.java |

| `list/{id}/prev/{count}` | StatAction.java, ViewAction.java |

| `list/{tableFlag}/row/select/where/{where}` | TableAction.java |

| `list/{tableFlag}/row/{id}/next/{count}` | TableAction.java |

| `list/{tableFlag}/row/{id}/prev/{count}` | TableAction.java |

| `model` | NeuralAction.java |

| `model/{modelFlag}` | NeuralAction.java |

| `model/{modelFlag}/reset/status` | NeuralAction.java |

| `neural` | NeuralAction.java |

| `output` | OutputAction.java |

| `prepare/cover` | InputAction.java |

| `prepare/create` | InputAction.java |

| `query` | QueryAction.java |

| `query/{query}/build` | TableAction.java |

| `querycategory/list` | QueryAction.java |

| `reload/dynamic` | TableAction.java |

| `search` | DesignerAction.java |

| `stat` | StatAction.java |

| `statement` | StatementAction.java |

| `stop/generating/model/{modelFlag}` | NeuralAction.java |

| `stop/learn/model/{modelFlag}` | NeuralAction.java |

| `table` | TableAction.java |

| `view` | ViewAction.java |

| `{count}` | IdAction.java |

| `{flag}` | QueryAction.java, StatementAction.java, TableAction.java |

| `{flag}/execute` | TableAction.java |

| `{flag}/execute/mode/{mode}/page/{page}/size/{size}` | StatementAction.java |

| `{flag}/execute/page/{page}/size/{size}` | StatementAction.java |

| `{flag}/icon` | QueryAction.java |

| `{flag}/select/file` | OutputAction.java |

| `{flag}/status/build` | TableAction.java |

| `{flag}/status/draft` | TableAction.java |

| `{id}` | ImportModelAction.java, StatAction.java, ViewAction.java |

| `{id}/bundle` | ViewAction.java |

| `{id}/permission` | ImportModelAction.java, QueryAction.java, StatAction.java, StatementAction.java, TableAction.java, ViewAction.java |

| `{id}/simulate` | StatAction.java, ViewAction.java |

| `{queryFlag}/select` | OutputAction.java |

| `{query}/build/dispatch` | TableAction.java |

| `{tableFlag}/row` | TableAction.java |

| `{tableFlag}/row/count/where/{where}` | TableAction.java |

| `{tableFlag}/row/delete/all` | TableAction.java |

| `{tableFlag}/row/save` | TableAction.java |

| `{tableFlag}/row/{id}` | TableAction.java |



## x_query_assemble_surface

*功能：数据查询展示*

| 接口路径 | Action 文件 |

|---|---|

| `excel/result/{flag}` | ViewAction.java |

| `execute/record/{recordId}` | ImportModelAction.java |

| `flag/{flag}/query/{queryFlag}` | ImportModelAction.java, StatAction.java, ViewAction.java |

| `flag/{flag}/query/{queryFlag}/bundle` | ViewAction.java |

| `flag/{flag}/query/{queryFlag}/bundle/mockputtopost` | ViewAction.java |

| `flag/{flag}/query/{queryFlag}/excel` | ViewAction.java |

| `flag/{flag}/query/{queryFlag}/excel/mockputtopost` | ViewAction.java |

| `flag/{flag}/query/{queryFlag}/execute` | StatAction.java, ViewAction.java |

| `flag/{flag}/query/{queryFlag}/execute/mockputtopost` | StatAction.java, ViewAction.java |

| `importmodel` | ImportModelAction.java |

| `list` | QueryAction.java |

| `list/calculate/model/{modelFlag}/work/{workId}` | NeuralAction.java |

| `list/key/{key}` | QueryAction.java |

| `list/paging/{page}/size/{size}` | TableAction.java |

| `list/query/{queryFlag}` | ImportModelAction.java, StatAction.java, StatementAction.java, ViewAction.java |

| `list/record/item/paging/{page}/size/{size}` | ImportModelAction.java |

| `list/record/paging/{page}/size/{size}` | ImportModelAction.java |

| `list/table/{tableFlag}/row/paging/{page}/size/{size}` | TableAction.java |

| `list/{id}/next/{count}` | TableAction.java |

| `list/{id}/prev/{count}` | TableAction.java |

| `list/{tableFlag}/row/select` | TableAction.java |

| `list/{tableFlag}/row/select/where/{where}` | TableAction.java |

| `list/{tableFlag}/row/{id}/next/{count}` | TableAction.java |

| `list/{tableFlag}/row/{id}/prev/{count}` | TableAction.java |

| `morelikethis` | MoreLikeThisAction.java |

| `neural` | NeuralAction.java |

| `query` | QueryAction.java |

| `record/{recordId}` | ImportModelAction.java |

| `record/{recordId}/mockdeletetoget` | ImportModelAction.java |

| `record/{recordId}/status` | ImportModelAction.java |

| `reload/dynamic` | TableAction.java |

| `search` | SearchAction.java |

| `stat` | StatAction.java |

| `statement` | StatementAction.java |

| `table` | TableAction.java |

| `uuid` | ImportModelAction.java |

| `view` | ViewAction.java |

| `{flag}` | QueryAction.java, TableAction.java |

| `{flag}/execute/mode/{mode}/page/{page}/size/{size}` | StatementAction.java |

| `{flag}/execute/page/{page}/size/{size}` | StatementAction.java |

| `{id}` | ImportModelAction.java, StatAction.java, StatementAction.java, ViewAction.java |

| `{id}/bundle` | ViewAction.java |

| `{id}/bundle/mockputtopost` | ViewAction.java |

| `{id}/excel` | ViewAction.java |

| `{id}/excel/mockputtopost` | ViewAction.java |

| `{id}/execute` | ImportModelAction.java, StatAction.java, ViewAction.java |

| `{id}/execute/mockputtopost` | StatAction.java, ViewAction.java |

| `{id}/format` | StatementAction.java |

| `{tableFlag}/row` | TableAction.java |

| `{tableFlag}/row/count/where/{where}` | TableAction.java |

| `{tableFlag}/row/delete/all` | TableAction.java |

| `{tableFlag}/row/delete/all/mockdeletetoget` | TableAction.java |

| `{tableFlag}/row/one` | TableAction.java |

| `{tableFlag}/row/{id}` | TableAction.java |

| `{tableFlag}/row/{id}/mockdeletetoget` | TableAction.java |

| `{tableFlag}/row/{id}/mockputtopost` | TableAction.java |

| `{tableFlag}/row/{id}/part/update` | TableAction.java |



## x_query_service_processing

*功能：数据查询服务*

| 接口路径 | Action 文件 |

|---|---|

| `design` | DesignAction.java |

| `directory/document/count` | IndexAction.java |

| `generate/model/{modelFlag}` | NeuralAction.java |

| `high/freq/document/node/{node}/reset` | TouchAction.java |

| `high/freq/document/node/{node}/touch` | TouchAction.java |

| `high/freq/work/node/{node}/reset` | TouchAction.java |

| `high/freq/work/node/{node}/touch` | TouchAction.java |

| `high/freq/workcompleted/node/{node}/reset` | TouchAction.java |

| `high/freq/workcompleted/node/{node}/touch` | TouchAction.java |

| `index` | IndexAction.java |

| `learn/model/{modelFlag}` | NeuralAction.java |

| `list/calculate/model/{modelFlag}/work/{workId}` | NeuralAction.java |

| `low/freq/document/node/{node}/reset` | TouchAction.java |

| `low/freq/document/node/{node}/touch` | TouchAction.java |

| `low/freq/work/node/{node}/reset` | TouchAction.java |

| `low/freq/work/node/{node}/touch` | TouchAction.java |

| `low/freq/workcompleted/node/{node}/reset` | TouchAction.java |

| `low/freq/workcompleted/node/{node}/touch` | TouchAction.java |

| `neural` | NeuralAction.java |

| `optimize/index/{node}/touch` | TouchAction.java |

| `reload/dynamic` | TableAction.java |

| `search` | DesignAction.java |

| `stop/generating/model/{modelFlag}` | NeuralAction.java |

| `stop/learning/model/{modelFlag}` | NeuralAction.java |

| `table` | TableAction.java |

| `touch` | TouchAction.java |

| `update/extra/document` | IndexAction.java |

| `{flag}/insert` | TableAction.java |

| `{flag}/update/{bundle}` | TableAction.java |


