USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[GetCRDetail]    Script Date: 20 Apr 2020 5:10:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 20 apr 2020
-- =============================================
CREATE PROCEDURE [dbo].[GetCRDetail]
@CR_ID int

AS
BEGIN
	SELECT [dbo].[CRDetails].* from CRDetails where CR_ID = @CR_ID
END
GO


