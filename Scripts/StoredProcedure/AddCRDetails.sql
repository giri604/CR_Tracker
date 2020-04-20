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
@CrDescription nvarchar(max),
@Complexity nvarchar(50),
@Department nvarchar(50),
@Category nvarchar(50),
@ProjectCompletedSchedule bit,
@KeyProjects bit,
@ProjectCRReceivedDate nvarchar(50),
@FinalProjectCRReceivedDate nvarchar(50),
@NoOfCRReceivedDuringUAT int,
@UATDeliveryDate nvarchar(50),
@UATSignoffDate nvarchar(50),
@ProjectCRLiveDate nvarchar(50),
@FirstCommittedLiveDate nvarchar(50),
@TAT nvarchar(50),
@NoOdShowstoppersPostGoLive int,
@UnitLead nvarchar(50),
@Manager nvarchar(50),
@ReasonRCA nvarchar(50)

AS
BEGIN
insert into [dbo].[CRDetails]
		  ([CrDescription]
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
		  ,[ReasonRCA])
		  values
		 (@CrDescription,
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
		  @ReasonRCA)
END
GO


