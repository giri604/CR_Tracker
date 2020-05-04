
/****** Object:  StoredProcedure [dbo].[sp_Download_Files_In_Zip]    Script Date: 04 May 2020 4:41:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Download_Files_In_Zip]
@WhereQuery VARCHAR(MAX)=''
AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
	SET @STRSQL ='SELECT FileName FROM CRAttachFiles WHERE ('+@WhereQuery+') ORDER BY FileID DESC';
	EXEC(@STRSQL)
END
END


--sp_Download_Files_In_Zip 'CR_ID=1'
GO


