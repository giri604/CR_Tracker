GO

/****** Object:  StoredProcedure [dbo].[GetCRAttachFile]    Script Date: 24 Apr 2020 11:19:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Deepak Giri
-- Create date: 23 Apr 2020
-- =============================================
CREATE PROCEDURE [dbo].[GetCRAttachFile]
@FileID int
AS
BEGIN
  
    SET NOCOUNT ON;

SELECT [FileID]
	  ,[CR_ID]
      ,[FileName]
      ,[ContentType]
      ,[AttachDocument]
  FROM [MyDemoDB].[dbo].[CRAttachFiles] where FileID = @FileID

	

END

GO


