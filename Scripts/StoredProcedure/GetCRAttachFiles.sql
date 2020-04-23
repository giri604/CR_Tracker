USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[GetCRAttachFiles]    Script Date: 23 Apr 2020 7:13:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 23 Apr 2020
-- =============================================
CREATE PROCEDURE [dbo].[GetCRAttachFiles]
@AttachFileId int
AS
BEGIN
  
    SET NOCOUNT ON;

SELECT [SrNo]
      ,[FileName]
      ,[ContentType]
      ,[AttachDocument]
      ,[CreatedDate]
      ,[ModifiedDateTime]
  FROM [MyDemoDB].[dbo].[CRAttachFiles] where SrNo = @AttachFileId

	

END
GO


