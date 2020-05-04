GO

/****** Object:  StoredProcedure [dbo].[AddCRDetails]******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 20 apr 2020
-- =============================================
CREATE PROCEDURE [dbo].[AddCRDetails]
@CrTitle nvarchar(50) = null,
@CrDescription nvarchar(max) = null,
@Complexity nvarchar(50) = null,
@Department nvarchar(50) = null,
@Category nvarchar(50) = null,
@ProjectCompletedSchedule bit = null,
@KeyProjects bit = null,
@ProjectCRReceivedDate DATE = null,
@FinalProjectCRReceivedDate DATE = null,
@NoOfCRReceivedDuringUAT int = null,
@UATDeliveryDate DATE = null,
@UATSignoffDate DATE = null,
@ProjectCRLiveDate DATE = null,
@FirstCommittedLiveDate DATE = null,
@TAT nvarchar(50) = null,
@NoOdShowstoppersPostGoLive int = null,
@UnitLead nvarchar(50) = null,
@Manager nvarchar(50) = null,
@ExpectedDate DATE = null,
@ReasonRCA nvarchar(50) = null,
@CR_IDOut int = NULL Output

AS
BEGIN
insert into [dbo].[CRDetails]
		  ([CrTitle],
		   [CrDescription]
		  ,[ComplexityList]
		  ,[DepartmentList]
		  ,[CategoryList]
		  ,[ProjectCompletedSchedule]
		  ,[KeyProjects]
		  ,[ProjectCRReceivedDate]
		  ,[FinalProjectCRReceivedDate]
		  ,[NoOfCRReceivedDuringUAT]
		  ,[UATDeliveryDate]
		  ,[UATSignoffDate]
		  ,[ProjectCRLiveDate]
		  ,[FirstCommittedLiveDate]
		  ,[TAT]
		  ,[NoOfShowstoppersPostGoLive]
		  ,[UnitLead]
		  ,[Manager]
		  ,[ExpectedDate]
		  ,[ReasonRCA])
		  values
		 (@CrTitle,
		  @CrDescription,
		  @Complexity,
		  @Department,
		  @Category,
		  @ProjectCompletedSchedule,
		  @KeyProjects,
		  @ProjectCRReceivedDate,
		  @FinalProjectCRReceivedDate,
		  @NoOfCRReceivedDuringUAT,
		  @UATDeliveryDate,
		  @UATSignoffDate,
		  @ProjectCRLiveDate,
		  @FirstCommittedLiveDate,
		  @TAT,
		  @NoOdShowstoppersPostGoLive,
		  @UnitLead,
		  @Manager,
		  @ExpectedDate,
		  @ReasonRCA)

select SCOPE_IDENTITY() as CR_ID;
END
GO


