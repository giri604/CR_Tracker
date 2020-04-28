USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[AddCRDetails]    Script Date: 20 Apr 2020 5:10:24 PM ******/
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
@ProjectCRReceivedDate nvarchar(50) = null,
@FinalProjectCRReceivedDate nvarchar(50) = null,
@NoOfCRReceivedDuringUAT int = null,
@UATDeliveryDate nvarchar(50) = null,
@UATSignoffDate nvarchar(50) = null,
@ProjectCRLiveDate nvarchar(50) = null,
@FirstCommittedLiveDate nvarchar(50) = null,
@TAT nvarchar(50) = null,
@NoOdShowstoppersPostGoLive int = null,
@UnitLead nvarchar(50) = null,
@Manager nvarchar(50) = null,
@ExpextedDate nvarchar(50) = null,
@ReasonRCA nvarchar(50) = null,
@SrNoOut int = NULL Output

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
		  ,[ExpextedDate]
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
		  @ExpextedDate,
		  @ReasonRCA)

select SCOPE_IDENTITY() as SRNo;
END
GO


