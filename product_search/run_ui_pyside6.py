# -*- coding: utf-8 -*-
"""打包入口 - 切换到 tupian 目录再运行"""
import os, sys

# 切换到 exe 所在目录（兼容打包后的相对路径）
if getattr(sys, 'frozen', False):
    base = os.path.dirname(os.path.abspath(sys.executable))
    os.chdir(base)
    sys.path.insert(0, base)

# 复用 ui_pyside6.py 的启动逻辑
if __name__ == "__main__":
    # 先尝试 PySide6
    try:
        from PySide6.QtWidgets import QApplication
        from ui_pyside6 import MW
        app = QApplication([])
        win = MW()
        win.show()
        app.exec()
    except ImportError:
        # 没有 PySide6 则回退到 PyQt6
        from PyQt6.QtWidgets import QApplication
        from ui_pyside6 import MW
        app = QApplication([])
        win = MW()
        win.show()
        app.exec()
