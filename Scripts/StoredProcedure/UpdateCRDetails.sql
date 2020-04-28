USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[UpdateCRDetails]    Script Date: 28 Apr 2020 4:50:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 22 apr 2020
-- =============================================
Create PROCEDURE [dbo].[UpdateCRDetails]
@SrNo int = NULL,
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
@ReasonRCA nvarchar(50) = null

AS
BEGIN
update [dbo].[CRDetails] set 
		   [CrTitle] = @CrTitle
		  ,[CrDescription] = @CrDescription
		  ,[ComplexityList] = @Complexity
		  ,[DepartmentList] = @Department
		  ,[CategoryList] = @Category
		  ,[ProjectCompletedSchedule] = @ProjectCompletedSchedule
		  ,[KeyProjects] = @KeyProjects
		  ,[ProjectCRReceivedDate] = @ProjectCRReceivedDate
		  ,[FinalProjectCRReceivedDate] = @FinalProjectCRReceivedDate
		  ,[NoOfCRReceivedDuringUAT] = @NoOfCRReceivedDuringUAT
		  ,[UATDeliveryDate] = @UATDeliveryDate
		  ,[UATSignoffDate] = @UATSignoffDate
		  ,[ProjectCRLiveDate] = @ProjectCRLiveDate
		  ,[FirstCommittedLiveDate] = @FirstCommittedLiveDate
		  ,[TAT] = @TAT
		  ,[NoOfShowstoppersPostGoLive] = @NoOdShowstoppersPostGoLive
		  ,[UnitLead] = @UnitLead
		  ,[Manager] = @Manager
		  ,[ReasonRCA] = @ReasonRCA
where SrNo = @SrNo
		  
END
GO


