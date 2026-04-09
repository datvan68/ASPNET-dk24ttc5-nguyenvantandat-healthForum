USE HealthForumDb;

DELIMITER //

CREATE PROCEDURE sp_GetForumTopics()
BEGIN
    SELECT
        t.Id,
        t.Title,
        t.Content,
        t.CreatedAt,
        c.Name AS CategoryName
    FROM Topics t
    INNER JOIN ForumCategories c ON c.Id = t.CategoryId
    ORDER BY t.CreatedAt DESC;
END //

DELIMITER ;
