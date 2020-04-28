USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[GetExpectedDates]    Script Date: 28 Apr 2020 4:49:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 23 Apr 2020
-- =============================================
CREATE PROCEDURE [dbo].[GetExpectedDates]
AS
BEGIN
  
    SET NOCOUNT ON;

SELECT [ExpextedDate]
  FROM [MyDemoDB].[dbo].[CRDetails] where [ExpextedDate] is not null

	

END
GO


